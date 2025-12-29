import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endpoints.js";

const EmpleadoService = {
  // =======================
  // POST /empleados (Crear nuevo empleado)
  // =======================
    // public class EmpleadoCreateRequest {
    //     private String nombre;
    //     private String apellido;
    //     private String dni;
    //     private String direccion;
    //     private String mail;
    //     private String telefono;
    //     private Long rolId;
    // }
  crearEmpleado: async (payload) => {
    const { data } = await api.post(ENDPOINTS.EMPLEADOS.BASE, payload);
    return data;
  },

  // =======================
  // GET /empleados (Obtener lista paginada con filtros)
  // =======================
    // public class EmpleadoQuery {
    //     private String nombre;
    //     private String apellido;
    //     private String dni;
    //     private Boolean tieneUsuario;
    //     private String orden;
    //     private String direccion;
    //     private Integer pagina;
    // }
  getEmpleados: async (filters = {}) => {
    const { data } = await api.get(ENDPOINTS.EMPLEADOS.BASE, {
      params: filters, // Mapea EmpleadoQuery
    });
    return data;
  },

  // =======================
  // GET /empleados/{id} (Obtener detalle de un empleado)
  // =======================
    // public class EmpleadoResponse {
    //     private Long id;
    //     private String nombre;
    //     private String apellido;
    //     private String dni;
    //     private String direccion;
    //     private String mail;
    //     private String telefono;
    //     private UsuarioResponse usuario;
    // }
  getEmpleadoById: async (id) => {
    const { data } = await api.get(ENDPOINTS.EMPLEADOS.POR_ID(id));
    return data;
  },

  // =======================
  // PATCH /empleados/{id} (Actualizar datos del empleado)
  // =======================
    // public class EmpleadoUpdateRequest {
    //     private String direccion;
    //     private String mail;
    //     private String telefono;
    // }
  actualizarEmpleado: async (id, payload) => {
    const { data } = await api.patch(ENDPOINTS.EMPLEADOS.POR_ID(id), payload);
    return data;
  },

  // =======================
  // PATCH /empleados/{id}/eliminacion (Baja lógica)
  // =======================
  eliminarEmpleado: async (id) => {
    await api.patch(ENDPOINTS.EMPLEADOS.ELIMINAR(id));
  },

  // =======================
  // Obtener preferencias de notificación de un empleado
  // GET /empleados/{id}/preferencias-notificacion
  // =======================
  getPreferencias: async (empleadoId) => {
    const { data } = await api.get(`${ENDPOINTS.EMPLEADOS.POR_ID(empleadoId)}/preferencias-notificacion`);
    return data;
  },

  // =======================
  // POST /empleados/{id}/preferencias-notificacion?medioNombre=EMAIL&habilitado=true
  // Crea o actualiza la preferencia para el empleado y medio
  // =======================
  setPreferencia: async (empleadoId, medioNombre, habilitado) => {
    // Se usan query params según el controller del backend
    const { data } = await api.post(`${ENDPOINTS.EMPLEADOS.POR_ID(empleadoId)}/preferencias-notificacion`, null, {
      params: {
        medioNombre,
        habilitado
      }
    });
    return data;
  },
};

export default EmpleadoService;
