export const request = {
  payload: {
    //  post login

    login: {
      request: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
        required: ["email", "password"],
      },
      response: {
        type: "object",
        properties: {
          token: { type: "string" },
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              nombre: { type: "string" },
              email: { type: "string", format: "email" },
            },
            required: ["id", "nombre", "email"],
          },
        },
        required: ["token", "user"],
      },
    },

    // post register

    register: {
      request: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          nombre: { type: "string" },
          apellido: { type: "string" },
          password: { type: "string" },
          
        },
        required: [
          "email",
          "nombre",
          "apellido",
          "password",
          
        ],
      },
      response: {
        type: "object",
        properties: {
          token: { type: "string" },
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              nombre: { type: "string" },
              apellido: { type: "string" },
              email: { type: "string", format: "email" },
            },
            required: ["id", "nombre", "apellido", "email"],
          },
        },
        required: ["token", "user"],
      },
    },

    //get viajes

    viajes: {
      get: {
        response: {
          type: "object",
          properties: {
            viajes: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  destino: { type: "string" },
                  descripcion: { type: "string" },
                  precio: { type: "number" },
                  imagen: {
                    type: "string",
                    description: "URL de la imagen del viaje",
                  },
                },
                required: ["id", "destino", "descripcion", "precio", "imagen"],
              },
            },
          },
          required: ["viajes"],
        },
      },
      detalle: {
        get: {
          response: {
            type: "object",
            properties: {
              id: { type: "number" },
              destino: { type: "string" },
              descripcion: { type: "string" },
              precio: { type: "number" },
              imagen: {
                type: "string",
                description: "URL de la imagen del viaje",
              },
            },
            required: ["id", "destino", "descripcion", "precio", "imagen"],
          },
        },
      },
    },

    // get favoritos

    favoritos: {
      post: {
        request: {
          type: "object",
          properties: {
            id_viaje: { type: "number" },
          },
          required: ["id_viaje"],
        },
        response: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
          required: ["message"],
        },
      },

      delete: {
        request: {
          type: "object",
          properties: {
            userId: { type: "string" },
            productId: { type: "string" },
          },
          required: ["userId", "productId"],
        },
        response: {
          type: "object",
          properties: { message: { type: "string" } },
          required: ["message"],
        },
      },
    },

    // get reseñas

    reseñas: {
      get: {
        response: {
          type: "object",
          properties: {
            reseñas: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  nombre: { type: "string" },
                  apellido: { type: "string" },
                  id_viaje: { type: "integer" },
                  valoracion: { type: "number" },
                  descripcion: { type: "string" },
                },
                required: [
                  "nombre",
                  "apellido",
                  "id_viaje",
                  "valoracion",
                  "descripcion",
                ],
              },
            },
          },
          required: ["reseñas"],
        },
      },

      // delete

      delete: {
        request: {
          type: "object",
          properties: {
            userId: { type: "string" },
            reviewId: { type: "string" },
          },
          required: ["userId", "reviewId"],
        },
        response: {
          type: "object",
          properties: { message: { type: "string" } },
          required: ["message"],
        },
      },
    },

    // put usuario

    usuario: {
      put: {
        request: {
          type: "object",
          properties: {
            nombre: { type: "string" },
            apellido: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
            imagen: {
              type: "string",
              description: "URL de la imagen del usuario",
            },
          },
          required: ["nombre", "apellido", "email", "password", "imagen"],
        },
        response: {
          type: "object",
          properties: {
            message: { type: "string" },
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                nombre: { type: "string" },
                apellido: { type: "string" },
                email: { type: "string", format: "email" },
                imagen: {
                  type: "string",
                  description: "URL de la imagen del usuario",
                },
              },
              required: ["id", "nombre", "apellido", "email", "imagen"],
            },
          },
          required: ["message", "user"],
        },
      },
    },
    
    //post reseñas

    misreseñas: {
      post: {
        request: {
          type: "object",
          properties: {
            
            id_viaje: { type: "integer" },
            valoracion: { type: "number", minimum: 1, maximum: 5 },
            descripcion: { type: "string" },
          },
          required: [ "id_viaje", "valoracion", "descripcion"],
        },

        header: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
            "Content-Type": { type: "string", enum: ["application/json"] },
          },
          required: ["Authorization", "Content-Type"],
        },

        response: {
          type: "object",
          properties: {
            message: { type: "string" },
            reseña: {
              type: "object",
              properties: {
                id: { type: "integer" }, // ID de la reseña creada
                id_usuario: { type: "integer" },
                id_viaje: { type: "integer" },
                valoracion: { type: "number" },
                descripcion: { type: "string" },
              },
              required: [
                "id",
                "id_usuario",
                "id_viaje",
                "valoracion",
                "descripcion",
              ],
            },
          },
          required: ["message", "reseña"],
        },
      },
    },
  },
};
