Acá esta el schema completo recordar que parte con 
export const request = {
  payload:
y despues en la respuesta va
  export const response =[


export const request = {
  payload: {
    login: {
      request: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email"
          },
          password: {
            type: "string"
          }
        },
        required: ["email", "password"]
      },
      response: {
        type: "object",
        properties: {
          token: {
            type: "string"
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "string"
              },
              nombre: {
                type: "string"
              },
              email: {
                type: "string",
                format: "email"
              }
            },
            required: ["id", "nombre", "email"]
          }
        },
        required: ["token", "user"]
      }
    },
    register: {
      request: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email"
          },
          nombre: {
            type: "string"
          },
          apellido: {
            type: "string"
          },
          password: {
            type: "string"
          },
          repetir_password: {
            type: "string"
          }
        },
        required: ["email", "nombre", "apellido", "password", "repetir_password"]
      },
      response: {
        type: "object",
        properties: {
          token: {
            type: "string"
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "string"
              },
              nombre: {
                type: "string"
              },
              apellido: {
                type: "string"
              },
              email: {
                type: "string",
                format: "email"
              }
            },
            required: ["id", "nombre", "apellido", "email"]
          }
        },
        required: ["token", "user"]
      }
    },
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
                  id: {
                    type: "number"
                  },
                  destino: {
                    type: "string"
                  },
                  descripcion: {
                    type: "string"
                  },
                  precio: {
                    type: "number"
                  },
                  imagen: {
                    type: "string",
                    description: "URL de la imagen del viaje"
                  }
                },
                required: ["id", "destino", "descripcion", "precio", "imagen"]
              }
            }
          },
          required: ["viajes"]
        }
      },
      detalle: {
        get: {
          response: {
            type: "object",
            properties: {
              id: {
                type: "number"
              },
              destino: {
                type: "string"
              },
              descripcion: {
                type: "string"
              },
              precio: {
                type: "number"
              },
              imagen: {
                type: "string",
                description: "URL de la imagen del viaje"
              }
            },
            required: ["id", "destino", "descripcion", "precio", "imagen"]
          }
        }
      }
    },
    favoritos: {
      post: {
        request: {
          type: "object",
          properties: {
            userId: {
              type: "string"
            },
            productId: {
              type: "string"
            }
          },
          required: ["userId", "productId"]
        },
        response: {
          type: "object",
          properties: {
            message: {
              type: "string"
            }
          },
          required: ["message"]
        }
      },
      delete: {
        request: {
          type: "object",
          properties: {
            userId: {
              type: "string"
            },
            productId: {
              type: "string"
            }
          },
          required: ["userId", "productId"]
        },
        response: {
          type: "object",
          properties: {
            message: {
              type: "string"
            }
          },
          required: ["message"]
        }
      }
    },
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
                  usuario_id: {
                    type: "integer"
                  },
                  nombre: {
                    type: "string"
                  },
                  apellido: {
                    type: "string"
                  },
                  destino: {
                    type: "string"
                  },
                  valoracion: {
                    type: "number"
                  },
                  descripcion: {
                    type: "string"
                  }
                },
                required: [
                  "usuario_id",
                  "nombre",
                  "apellido",
                  "destino",
                  "valoracion",
                  "descripcion"
                ]
              }
            }
          },
          required: ["reseñas"]
        }
      },
      delete: {
        request: {
          type: "object",
          properties: {
            userId: {
              type: "string"
            },
            reviewId: {
              type: "string"
            }
          },
          required: ["userId", "reviewId"]
        },
        response: {
          type: "object",
          properties: {
            message: {
              type: "string"
            }
          },
          required: ["message"]
        }
      }
    },
    usuario: {
      put: {
        request: {
          type: "object",
          properties: {
            nombre: {
              type: "string"
            },
            apellido: {
              type: "string"
            },
            email: {
              type: "string",
              format: "email"
            },
            password: {
              type: "string"
            },
            imagen: {
              type: "string",
              description: "URL de la imagen del usuario"
            }
          },
          required: ["nombre", "apellido", "email", "password", "imagen"]
        },
        response: {
          type: "object",
          properties: {
            message: {
              type: "string"
            },
            user: {
              type: "object",
              properties: {
                id: {
                  type: "string"
                },
                nombre: {
                  type: "string"
                },
                apellido: {
                  type: "string"
                },
                email: {
                  type: "string",
                  format: "email"
                },
                imagen: {
                  type: "string",
                  description: "URL de la imagen del usuario"
                }
              },
              required: ["id", "nombre", "apellido", "email", "imagen"]
            }
          },
          required: ["message", "user"]
        }
      }
    }
  }
};
