import cv2
import numpy as np
import base64

def aplicar_filtro(imagen_bytes, filtro, variante=None):
    try:
        nparr = np.frombuffer(imagen_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("No se pudo decodificar la imagen")
        gris = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    except Exception as e:
        print("Error al decodificar la imagen:", e)
        return None, None

    explicacion = ""  # <- Aquí guardaremos la explicación

    if filtro.lower() == "laplaciano":
        kernel = np.array([[0, -1, 0], [-1, 4, -1], [0, -1, 0]])
        resultado = cv2.filter2D(gris, -1, kernel)
        explicacion = (
            "Fórmula: L(x,y) = ∂²f/∂x² + ∂²f/∂y².\n"
            "Detecta bordes resaltando los cambios bruscos de intensidad en todas las direcciones."
        )

    elif filtro.lower() == "roberts":
        variantes_dict = {
            "↘ clásica": np.array([[1,0],[0,-1]]),
            "↙ ortogonal": np.array([[0,1],[-1,0]]),
            "↖ invertida": np.array([[-1, 0], [0, 1]]),
            "↗ alternativa": np.array([[0, -1],[1, 0]])
        }
        k = variantes_dict.get(variante, variantes_dict["↘ clásica"])
        resultado = cv2.filter2D(gris, -1, k)
        explicacion = (
            "Fórmula: G = √[(f(x,y)-f(x+1,y+1))² + (f(x+1,y)-f(x,y+1))²].\n"
            "Detecta bordes en diagonal comparando píxeles adyacentes, resaltando detalles finos."
        )

    elif filtro.lower() == "sobel":
        opciones = {
            "vertical": np.array([[1,2,1],[0,0,0],[-1,-2,-1]]),
            "horizontal": np.array([[1,0,-1],[2,0,-2],[1,0,-1]]),
            "diag_↘": np.array([[0, 1, 2], [-1, 0, 1], [-2, -1, 0]]),
            "diag_↙": np.array([[2, 1, 0], [1, 0, -1], [0, -1, -2]]),
            "diag_↖": np.array([[0, -1, -2], [1, 0, -1], [2, 1, 0]]),
            "diag_↗": np.array([[-2, -1, 0], [-1, 0, 1], [0, 1, 2]])
        }
        k = opciones.get(variante, opciones["vertical"])
        resultado = cv2.filter2D(gris, -1, k)
        explicacion = (
            "Fórmula: G = √(Gx² + Gy²), donde Gx = f*Kx y Gy = f*Ky.\n"
            "Detecta bordes en direcciones horizontales y verticales, menos sensible al ruido y produce bordes más suaves."
        )

    else:
        resultado = gris
        explicacion = "No se aplicó ningún filtro, se muestra la imagen en escala de grises."

    _, buffer = cv2.imencode(".png", resultado)
    img_b64 = base64.b64encode(buffer).decode("utf-8")
    return img_b64, explicacion
