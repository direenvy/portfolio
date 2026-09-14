"""Record a short clip of one project in use. Expects its frontend on :3000
(and API on :8000). Writes /c/t/clips/<name>.webm."""
import shutil, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

name = sys.argv[1]
OUT = Path("D:/Portfolio/site/clips"); OUT.mkdir(parents=True, exist_ok=True)
W, H = 1440, 900

def smooth_scroll(pg, px, seconds):
    steps = int(seconds * 30)
    for _ in range(steps):
        pg.mouse.wheel(0, px / steps); pg.wait_for_timeout(1000 / 30)

def sentinel(pg):
    pg.wait_for_timeout(1500)
    pills = pg.locator("button.btn-pill"); pills.nth(1).click(); pg.wait_for_timeout(1200)
    pg.get_by_role("button", name="Analyse transaction").click(); pg.wait_for_timeout(3200)
    smooth_scroll(pg, 520, 2.5); pg.wait_for_timeout(1200)

def sitewatch(pg):
    pg.wait_for_timeout(1500)
    thumbs = pg.locator("button[aria-label^='Test image']"); thumbs.nth(1).click(); pg.wait_for_timeout(3500)
    s = pg.locator("#threshold"); s.focus()
    for _ in range(3): pg.keyboard.press("ArrowLeft"); pg.wait_for_timeout(500)
    pg.wait_for_timeout(1200); thumbs.nth(3).click(); pg.wait_for_timeout(3000)

def trackside(pg):
    pg.wait_for_timeout(1500)
    smooth_scroll(pg, 1500, 5)
    pg.get_by_role("button", name="Landed").click(); pg.wait_for_timeout(1500)
    smooth_scroll(pg, 700, 2.5); pg.wait_for_timeout(800)

def kaunter(pg):
    pg.wait_for_timeout(1500)
    pg.get_by_role("button", name="What caused the MRT Putrajaya line disruption on 3 March 2026?").click()
    pg.wait_for_selector("text=Cited sources", timeout=60000); pg.wait_for_timeout(2500)
    smooth_scroll(pg, 400, 2); pg.wait_for_timeout(1000)

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)
    ctx = b.new_context(viewport={"width": W, "height": H}, record_video_dir=str(OUT / "raw"), record_video_size={"width": W, "height": H}, device_scale_factor=1)
    pg = ctx.new_page()
    pg.goto("http://localhost:3000", wait_until="networkidle")
    globals()[name](pg)
    path = pg.video.path()
    ctx.close(); b.close()
    shutil.move(path, OUT / f"{name}.webm")
print("recorded", name)
