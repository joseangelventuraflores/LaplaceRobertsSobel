from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from filters import aplicar_filtro

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/procesar")
async def procesar_imagen(file: UploadFile, filtro: str = Form(...), variante: str = Form(None)):
    try:
        contenido = await file.read()
        imagen_b64, kernel = aplicar_filtro(contenido, filtro, variante)

        if imagen_b64 is None:
            return JSONResponse({"error": "No se pudo procesar la imagen"}, status_code=400)

        return JSONResponse({
            "filtro": filtro,
            "imagen": imagen_b64,
            "kernel": kernel,
            "mensaje": f"Imagen procesada con filtro {filtro}"
        })
    except Exception as e:
        print("Error procesando imagen:", e)
        return JSONResponse({"error": str(e)}, status_code=500)

