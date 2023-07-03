```json

{
  "openapi": "3.0.2",
  "info": {
    "title": "API Test Case",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "http://localhost:8001"
    }
  ],
  "paths": {
    "/api/cities": {
      "get": {
        "summary": "Get list of cities",
        "tags": ["Cities"],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/City"
                  }
                },
                "example": [
                  {
                    "_id": "string",
                    "name": "string"
                  }
                ]
              }
            }
          }
        }
      }
    },
    "/api/register": {
      "post": {
        "summary": "Register a user",
        "tags": ["Users"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserPayload"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessRegisterResponse"
                }
              }
            }
          },
          "403": {
            "description": "Invalid Payload",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error403Payload"
                }
              }
            }
          },
          "404": {
            "description": "cityId Not Found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error404Payload"
                }
              }
            }
          }
        }
      }
    },
    "/api/login": {
      "post": {
        "summary": "User login",
        "tags": ["Users"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginPayload"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessLoginResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error401Payload"
                }
              }
            }
          }
        }
      }
    },
    "/api/accounts": {
      "get": {
        "summary": "Get all account",
        "tags": ["Users"],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserData"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/accounts/{userId}": {
      "get": {
        "summary": "Get account by id",
        "tags": ["Users"],
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "description": "User ID",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataUserByID"
                }
              }
            }
          },
          "404": {
            "description": "userId not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error404Payload"
                }
              }
            }
          }
        }
      },
      "put": {
        "summary": "Update account",
        "tags": ["Users"],
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "description": "User ID",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdatePasswordPayload"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessUpdateResponse"
                }
              }
            }
          },
          "403": {
            "description": "Invalid Payload",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error403Payload"
                }
              }
            }
          },
          "404": {
            "description": "userId not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error404Payload"
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete account",
        "tags": ["Users"],
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "description": "User ID",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessDeleteResponse"
                }
              }
            }
          },
          "404": {
            "description": "userId not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error404Payload"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "City": {
        "type": "object",
        "properties": {
          "_id": {
            "type": "string",
            "format": "ObjectId"
          },
          "name": {
            "type": "string"
          }
        }
      },
      "UserPayload": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "format": "email"
          },
          "password": {
            "type": "string"
          },
          "confirm_password": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "cityId": {
            "type": "string"
          },
          "hobbies": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "email",
          "password",
          "confirm_password",
          "name",
          "address",
          "cityId",
          "hobbies"
        ]
      },
      "Error403Payload": {
        "type": "object",
        "properties": {
          "error": {
            "type": "string",
            "description": "Error message"
          }
        }
      },
      "Error404Payload": {
        "type": "object",
        "properties": {
          "error": {
            "type": "string",
            "description": "Error message"
          }
        }
      },
      "LoginPayload": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "format": "email"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "email",
          "password"
        ]
      },
      "UserData": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "format": "email"
          },
          "password": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "cityId": {
            "type": "string"
          },
          "hobbies": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "last_login": {
            "type": "string"
          },
          "created_at": {
            "type": "string"
          },
          "updated_at": {
            "type": "string"
          },
          "_id": {
            "type": "string",
            "format": "ObjectId"
          },
          "__v": {
            "type": "integer"
          }
        }
      },
      "SuccessRegisterResponse": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "$ref": "#/components/schemas/UserData"
          }
        }
      },
      "SuccessLoginResponse": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "$ref": "#/components/schemas/UserData"
          }
        }
      },
      "SuccessUpdateResponse": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "$ref": "#/components/schemas/UserData"
          }
        }
      },
      "Error401Payload": {
        "type": "object",
        "properties": {
          "error": {
            "type": "string",
            "description": "Error message"
          }
        }
      },
      "DataUserByID": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "email": {
            "type": "string",
            "format": "email"
          },
          "profile": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "address": {
                "type": "string"
              },
              "city": {
                "type": "object",
                "properties": {
                  "_id": {
                    "type": "string",
                    "format": "ObjectId"
                  },
                  "name": {
                    "type": "string"
                  }
                }
              },
              "hobbies": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "last_login": {
            "type": "string",
            "format": "date-time"
          },
          "created_at": {
            "type": "string",
            "format": "date-time"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "UpdatePasswordPayload": {
        "type": "object",
        "properties": {
          "currentPassword": {
            "type": "string"
          },
          "newPassword": {
            "type": "string"
          },
          "passwordConfirm": {
            "type": "string"
          }
        },
        "required": [
          "currentPassword",
          "password",
          "passwordConfirm"
        ]
      },
      "SuccessDeleteResponse": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string"
          }
        }
      }
    }
  }
}
