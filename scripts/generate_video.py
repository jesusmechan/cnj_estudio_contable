"""Genera el video institucional de CNJ - Integridad Contable con narración."""

import asyncio
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
OUT_DIR = ROOT / "assets" / "video-slides"
VIDEO_OUT = ROOT / "assets" / "video-cnj.mp4"
NARRATION_OUT = OUT_DIR / "narration.mp3"
MUSIC_OUT = OUT_DIR / "ambient.mp3"
VIDEO_SILENT = OUT_DIR / "video-silent.mp4"
AUDIO_MIX = OUT_DIR / "audio-mix.mp3"

W, H = 1280, 720
NAVY = (36, 52, 71)
GOLD = (201, 162, 39)
WHITE = (255, 255, 255)
VOICE = "es-PE-CamilaNeural"

NARRATION = """
CNJ Integridad Contable. Confianza y precisión para el crecimiento de tu empresa.
Ofrecemos gestión y declaración tributaria ante la SUNAT, con cumplimiento fiscal oportuno.
Contabilidad integral y libros electrónicos para mantener tu información clara y al día.
Asesoría financiera y planificación fiscal para tomar mejores decisiones.
Contáctanos en contacto arroba cnjcontable punto pe. CNJ Integridad Contable.
""".strip()


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def fit_cover(img: Image.Image, width: int, height: int) -> Image.Image:
    ratio = max(width / img.width, height / img.height)
    resized = img.resize((int(img.width * ratio), int(img.height * ratio)), Image.Resampling.LANCZOS)
    left = (resized.width - width) // 2
    top = (resized.height - height) // 2
    return resized.crop((left, top, left + width, top + height))


def draw_gold_bar(draw: ImageDraw.ImageDraw, y: int) -> None:
    draw.rectangle((W // 2 - 48, y, W // 2 + 48, y + 4), fill=GOLD)


def slide_intro() -> Image.Image:
    canvas = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(canvas)
    logo = Image.open(ASSETS / "logo3.png").convert("RGBA")
    logo.thumbnail((180, 180), Image.Resampling.LANCZOS)
    canvas.paste(logo, ((W - logo.width) // 2, 170), logo)

    draw_gold_bar(draw, 390)
    draw.text((W // 2, 420), "CNJ - Integridad Contable", font=load_font(52, bold=True), fill=WHITE, anchor="mm")
    draw.text((W // 2, 490), "Confianza y Precisión", font=load_font(28), fill=GOLD, anchor="mm")
    draw.text((W // 2, 560), "Servicios contables, tributarios y financieros para MYPE", font=load_font(22), fill=(220, 225, 232), anchor="mm")
    return canvas


def slide_service(image_name: str, number: str, title: str, desc: str) -> Image.Image:
    photo = Image.open(ASSETS / image_name).convert("RGB")
    bg = fit_cover(photo, W, H)
    overlay = Image.new("RGBA", (W, H), (26, 37, 51, 170))
    bg = Image.alpha_composite(bg.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(bg)

    draw.rounded_rectangle((72, 72, 170, 130), radius=999, fill=GOLD)
    draw.text((121, 101), number, font=load_font(34, bold=True), fill=WHITE, anchor="mm")
    draw.text((72, 520), title, font=load_font(44, bold=True), fill=WHITE, anchor="lm")
    draw_gold_bar(draw, 580)
    draw.text((72, 610), desc, font=load_font(24), fill=(235, 238, 243), anchor="lm")
    return bg


def slide_outro() -> Image.Image:
    canvas = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(canvas)
    logo = Image.open(ASSETS / "logo3.png").convert("RGBA")
    logo.thumbnail((140, 140), Image.Resampling.LANCZOS)
    canvas.paste(logo, ((W - logo.width) // 2, 200), logo)

    draw_gold_bar(draw, 380)
    draw.text((W // 2, 430), "¿Listo para optimizar tu contabilidad?", font=load_font(36, bold=True), fill=WHITE, anchor="mm")
    draw.text((W // 2, 500), "contacto@cnjcontable.pe  ·  +51 987 654 321", font=load_font(24), fill=GOLD, anchor="mm")
    draw.text((W // 2, 560), "CNJ - Integridad Contable", font=load_font(22), fill=(220, 225, 232), anchor="mm")
    return canvas


def run_ffmpeg(args: list[str]) -> None:
    subprocess.run(["ffmpeg", "-y", *args], check=True)


def get_duration(path: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    return float(result.stdout.strip())


async def generate_narration() -> None:
    import edge_tts

    communicate = edge_tts.Communicate(NARRATION, VOICE)
    await communicate.save(str(NARRATION_OUT))
    print(f"Narración generada: {NARRATION_OUT.name}")


def generate_ambient(duration: float) -> None:
    run_ffmpeg([
        "-f", "lavfi",
        "-i", f"sine=frequency=220:duration={duration:.2f},volume=0.04",
        "-f", "lavfi",
        "-i", f"sine=frequency=330:duration={duration:.2f},volume=0.03",
        "-filter_complex", "[0:a][1:a]amix=inputs=2:duration=longest",
        "-c:a", "libmp3lame", "-q:a", "6",
        str(MUSIC_OUT),
    ])
    print(f"Música ambiental generada: {MUSIC_OUT.name}")


def mix_audio(duration: float) -> None:
    run_ffmpeg([
        "-i", str(NARRATION_OUT),
        "-i", str(MUSIC_OUT),
        "-filter_complex", "[0:a]volume=1.0[voice];[1:a]volume=0.35[music];[voice][music]amix=inputs=2:duration=first:dropout_transition=0",
        "-t", f"{duration:.2f}",
        "-c:a", "libmp3lame", "-q:a", "4",
        str(AUDIO_MIX),
    ])
    print(f"Audio mezclado: {AUDIO_MIX.name}")


def build_slides() -> list[Path]:
    slides = [
        slide_intro(),
        slide_service("producto-1.jpg", "01", "Gestión Tributaria SUNAT", "Declaraciones mensuales, anuales y cumplimiento fiscal."),
        slide_service("producto-2.jpg", "02", "Contabilidad Integral", "Libros electrónicos y estados financieros oportunos."),
        slide_service("producto-3.jpg", "03", "Asesoría Financiera", "Planificación fiscal y decisiones con datos claros."),
        slide_outro(),
    ]

    paths = []
    for index, slide in enumerate(slides, start=1):
        path = OUT_DIR / f"slide_{index:02d}.png"
        slide.save(path, "PNG")
        paths.append(path)
        print(f"Slide guardada: {path.name}")
    return paths


def build_video(slide_paths: list[Path], duration: float) -> None:
    slide_duration = duration / len(slide_paths)
    list_file = OUT_DIR / "concat.txt"
    lines = []
    for path in slide_paths:
        lines.append(f"file '{path.as_posix()}'")
        lines.append(f"duration {slide_duration:.3f}")
    lines.append(f"file '{slide_paths[-1].as_posix()}'")
    list_file.write_text("\n".join(lines), encoding="utf-8")

    run_ffmpeg([
        "-f", "concat", "-safe", "0",
        "-i", str(list_file),
        "-vf", "fps=30,format=yuv420p",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-t", f"{duration:.2f}",
        str(VIDEO_SILENT),
    ])
    print(f"Video sin audio: {VIDEO_SILENT.name}")


def merge_video_audio() -> None:
    run_ffmpeg([
        "-i", str(VIDEO_SILENT),
        "-i", str(AUDIO_MIX),
        "-c:v", "copy",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        "-movflags", "+faststart",
        str(VIDEO_OUT),
    ])
    print(f"Video final con audio: {VIDEO_OUT}")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    asyncio.run(generate_narration())
    audio_duration = get_duration(NARRATION_OUT) + 0.5

    generate_ambient(audio_duration)
    mix_audio(audio_duration)

    slide_paths = build_slides()
    build_video(slide_paths, audio_duration)
    merge_video_audio()


if __name__ == "__main__":
    main()
