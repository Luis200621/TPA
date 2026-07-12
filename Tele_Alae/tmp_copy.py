import shutil
from pathlib import Path
root = Path(r'c:\Users\samir\OneDrive\Escritorio\Proyecto_TPA\TPA\Tele_Alae')
for name in ['lib', 'islands', 'routes', 'components']:
    src = root / name
    dst = root / 'src' / name
    if not src.exists():
        continue
    dst.mkdir(parents=True, exist_ok=True)
    for item in src.iterdir():
        target = dst / item.name
        if target.exists() and target.is_dir() and item.is_dir():
            shutil.rmtree(target)
        elif target.exists():
            target.unlink()
        if item.is_dir():
            shutil.copytree(item, target, dirs_exist_ok=True)
        else:
            shutil.copy2(item, target)
print('copied')
