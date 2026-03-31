from PIL import Image

# Cargar la imagen original subida por el usuario abajo dentro de los '' colocar el path de la imagen para redimensionar
original_img_path = 'Images\gamingfondo.png'
img = Image.open(original_img_path)

# Redimensionar exactamente a 640x480 usando Nearest Neighbor
# (Vecino más cercano) para mantener los píxeles nítidos y no borrosos.
resized_img = img.resize((640, 480), Image.NEAREST)

# Guardar la nueva imagen y cambiar el nombre de la imagen redimensionada
output_path = 'gamingfondo_640x480.png'
resized_img.save(output_path)
print(f"Imagen redimensionada a: {resized_img.size}")