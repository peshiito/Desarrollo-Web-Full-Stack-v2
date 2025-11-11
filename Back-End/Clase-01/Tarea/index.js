/**
 * TaskFlow Pro - Sistema Avanzado de Gestión de Tareas
 * Aplicación profesional con todas las funcionalidades solicitadas
 */

class TaskManager {
  constructor() {
    // Configuración inicial usando destructuring
    const config = this.getDefaultConfig();
    Object.assign(this, config);

    // Estado de la aplicación
    this.state = {
      tasks: [],
      currentFilter: "all",
      searchQuery: "",
      editingTaskId: null,
      currentView: "dashboard",
      currentDate: new Date(),
    };

    // Inicialización
    this.init();
  }

  /**
   * Configuración por defecto de la aplicación
   */
  getDefaultConfig() {
    return {
      STORAGE_KEY: "taskflow-pro-data",
      TASK_STATUS: {
        PENDING: "pending",
        COMPLETED: "completed",
        OVERDUE: "overdue",
      },
      PRIORITIES: {
        LOW: "low",
        MEDIUM: "medium",
        HIGH: "high",
      },
      CATEGORIES: ["work", "personal", "study", "health", "other"],
    };
  }

  /**
   * Inicializa la aplicación
   */
  init() {
    this.loadData();
    this.initializeEventListeners();
    this.renderDashboard();
    this.showNotification("Sistema cargado correctamente", "success");
  }

  /**
   * Carga los datos desde localStorage
   */
  loadData() {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);
      if (savedData) {
        const { tasks, settings } = JSON.parse(savedData);
        this.state.tasks = tasks || [];
        this.applySettings(settings || {});
      }
    } catch (error) {
      console.error("Error loading data:", error);
      this.showNotification("Error al cargar los datos", "error");
    }
  }

  /**
   * Guarda los datos en localStorage
   */
  saveData() {
    try {
      const data = {
        tasks: this.state.tasks,
        settings: this.getCurrentSettings(),
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data:", error);
      this.showNotification("Error al guardar los datos", "error");
    }
  }

  /**
   * Aplica la configuración de la aplicación
   */
  applySettings(settings) {
    // Aplicar tema
    if (settings.theme) {
      document.documentElement.setAttribute("data-theme", settings.theme);
    }
  }

  /**
   * Obtiene la configuración actual
   */
  getCurrentSettings() {
    return {
      theme: document.documentElement.getAttribute("data-theme") || "light",
      language: "es",
      notifications: true,
    };
  }

  /**
   * Inicializa todos los event listeners
   */
  initializeEventListeners() {
    // Navegación
    this.setupNavigation();

    // Formularios
    this.setupTaskForm();

    // Filtros y búsqueda
    this.setupFilters();

    // Controles de tareas
    this.setupTaskControls();

    // Calendario
    this.setupCalendar();

    // Configuración
    this.setupSettings();

    // Eventos globales
    this.setupGlobalEvents();
  }

  /**
   * Configura la navegación entre secciones
   */
  setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        const section = item.dataset.section;
        this.switchSection(section);

        // Actualizar estado activo
        navItems.forEach((nav) => nav.classList.remove("active"));
        item.classList.add("active");
      });
    });
  }

  /**
   * Cambia entre secciones de la aplicación
   */
  switchSection(section) {
    // Ocultar todas las secciones
    document.querySelectorAll(".content-section").forEach((sec) => {
      sec.classList.remove("active");
    });

    // Mostrar sección seleccionada
    const targetSection = document.getElementById(section);
    if (targetSection) {
      targetSection.classList.add("active");
      this.state.currentView = section;

      // Renderizar contenido específico de la sección
      switch (section) {
        case "dashboard":
          this.renderDashboard();
          break;
        case "tasks":
          this.renderTasks();
          break;
        case "calendar":
          this.renderCalendar();
          break;
        case "analytics":
          this.renderAnalytics();
          break;
        case "settings":
          this.renderSettings();
          break;
      }
    }
  }

  /**
   * Configura el formulario de tareas
   */
  setupTaskForm() {
    const form = document.getElementById("task-form");
    const modal = document.getElementById("task-modal");
    const cancelBtn = document.getElementById("cancel-task");
    const closeBtn = document.querySelector(".close-modal");

    // Abrir modal para nueva tarea
    document.getElementById("add-task-btn").addEventListener("click", () => {
      this.openTaskModal();
    });

    // Quick add desde dashboard
    document.getElementById("quick-add-task").addEventListener("click", () => {
      this.openTaskModal();
    });

    // Envío del formulario
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleTaskSubmit();
    });

    // Cancelar edición
    cancelBtn.addEventListener("click", () => {
      this.closeTaskModal();
    });

    // Cerrar modal
    closeBtn.addEventListener("click", () => {
      this.closeTaskModal();
    });

    // Contadores de caracteres
    this.setupCharacterCounters();
  }

  /**
   * Configura los contadores de caracteres
   */
  setupCharacterCounters() {
    const titleInput = document.getElementById("task-title");
    const descInput = document.getElementById("task-description");
    const titleCounter = document.getElementById("title-counter");
    const descCounter = document.getElementById("description-counter");

    titleInput.addEventListener("input", () => {
      titleCounter.textContent = `${titleInput.value.length}/100`;
    });

    descInput.addEventListener("input", () => {
      descCounter.textContent = `${descInput.value.length}/500`;
    });
  }

  /**
   * Abre el modal para crear/editar tarea
   */
  openTaskModal(taskId = null) {
    const modal = document.getElementById("task-modal");
    const form = document.getElementById("task-form");
    const title = document.getElementById("modal-title");

    if (taskId) {
      // Modo edición
      title.textContent = "Editar Tarea";
      this.state.editingTaskId = taskId;
      this.populateTaskForm(taskId);
    } else {
      // Modo creación
      title.textContent = "Nueva Tarea";
      form.reset();
      this.state.editingTaskId = null;

      // Establecer fecha por defecto (mañana)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      document.getElementById("task-due-date").value = tomorrow
        .toISOString()
        .split("T")[0];
    }

    modal.classList.add("active");
  }

  /**
   * Cierra el modal de tarea
   */
  closeTaskModal() {
    const modal = document.getElementById("task-modal");
    modal.classList.remove("active");
    this.state.editingTaskId = null;
  }

  /**
   * Rellena el formulario con los datos de la tarea
   */
  populateTaskForm(taskId) {
    const task = this.state.tasks.find((t) => t.id === taskId);
    if (!task) return;

    document.getElementById("task-id").value = task.id;
    document.getElementById("task-title").value = task.title;
    document.getElementById("task-description").value = task.description || "";
    document.getElementById("task-priority").value = task.priority;
    document.getElementById("task-category").value = task.category;
    document.getElementById("task-due-date").value = task.dueDate || "";
    document.getElementById("task-tags").value = task.tags
      ? task.tags.join(", ")
      : "";

    // Actualizar contadores
    document.getElementById(
      "title-counter"
    ).textContent = `${task.title.length}/100`;
    document.getElementById("description-counter").textContent = `${
      (task.description || "").length
    }/500`;
  }

  /**
   * Maneja el envío del formulario de tarea
   */
  handleTaskSubmit() {
    const formData = new FormData(document.getElementById("task-form"));

    // Validar datos
    if (!this.validateTaskData(formData)) {
      return;
    }

    const taskData = {
      id: this.state.editingTaskId || this.generateId(),
      title: formData.get("task-title"),
      description: formData.get("task-description"),
      priority: formData.get("task-priority"),
      category: formData.get("task-category"),
      dueDate: formData.get("task-due-date"),
      tags: formData.get("task-tags")
        ? formData
            .get("task-tags")
            .split(",")
            .map((tag) => tag.trim())
        : [],
      status: this.state.editingTaskId
        ? this.state.tasks.find((t) => t.id === this.state.editingTaskId).status
        : this.TASK_STATUS.PENDING,
      createdAt: this.state.editingTaskId
        ? this.state.tasks.find((t) => t.id === this.state.editingTaskId)
            .createdAt
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (this.state.editingTaskId) {
      this.updateTask(taskData);
    } else {
      this.addTask(taskData);
    }

    this.closeTaskModal();
    this.renderTasks();
    this.updateStats();
    this.saveData();
  }

  /**
   * Valida los datos del formulario
   */
  validateTaskData(formData) {
    const title = formData.get("task-title").trim();

    if (!title) {
      this.showNotification("El título es obligatorio", "error");
      return false;
    }

    if (title.length > 100) {
      this.showNotification(
        "El título no puede tener más de 100 caracteres",
        "error"
      );
      return false;
    }

    return true;
  }

  /**
   * Genera un ID único
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Agrega una nueva tarea
   */
  addTask(taskData) {
    this.state.tasks.unshift(taskData);
    this.showNotification("Tarea agregada correctamente", "success");
  }

  /**
   * Actualiza una tarea existente
   */
  updateTask(taskData) {
    const index = this.state.tasks.findIndex((t) => t.id === taskData.id);
    if (index !== -1) {
      this.state.tasks[index] = taskData;
      this.showNotification("Tarea actualizada correctamente", "success");
    }
  }

  /**
   * Configura los filtros y búsqueda
   */
  setupFilters() {
    // Filtro por estado
    document.getElementById("filter-status").addEventListener("change", (e) => {
      this.state.currentFilter = e.target.value;
      this.renderTasks();
    });

    // Filtro por prioridad
    document
      .getElementById("filter-priority")
      .addEventListener("change", (e) => {
        this.state.priorityFilter = e.target.value;
        this.renderTasks();
      });

    // Filtro por categoría
    document
      .getElementById("filter-category")
      .addEventListener("change", (e) => {
        this.state.categoryFilter = e.target.value;
        this.renderTasks();
      });

    // Búsqueda
    document.getElementById("task-search").addEventListener("input", (e) => {
      this.state.searchQuery = e.target.value.toLowerCase();
      this.renderTasks();
    });
  }

  /**
   * Configura los controles de tareas
   */
  setupTaskControls() {
    // Completar todas las tareas
    document
      .getElementById("mark-all-completed")
      .addEventListener("click", () => {
        this.markAllTasksCompleted();
      });

    // Exportar datos
    document.getElementById("export-data").addEventListener("click", () => {
      this.exportData();
    });

    // Importar datos
    document.getElementById("import-data").addEventListener("click", () => {
      this.importData();
    });
  }

  /**
   * Marca todas las tareas como completadas
   */
  markAllTasksCompleted() {
    const pendingTasks = this.state.tasks.filter(
      (task) => task.status === this.TASK_STATUS.PENDING
    );

    if (pendingTasks.length === 0) {
      this.showNotification(
        "No hay tareas pendientes para completar",
        "warning"
      );
      return;
    }

    if (confirm(`¿Marcar ${pendingTasks.length} tareas como completadas?`)) {
      this.state.tasks = this.state.tasks.map((task) => ({
        ...task,
        status:
          task.status === this.TASK_STATUS.PENDING
            ? this.TASK_STATUS.COMPLETED
            : task.status,
        updatedAt: new Date().toISOString(),
      }));

      this.renderTasks();
      this.updateStats();
      this.saveData();
      this.showNotification(
        `${pendingTasks.length} tareas marcadas como completadas`,
        "success"
      );
    }
  }

  /**
   * Renderiza el dashboard
   */
  renderDashboard() {
    this.updateStats();
    this.renderCharts();
  }

  /**
   * Actualiza las estadísticas
   */
  updateStats() {
    const total = this.state.tasks.length;
    const completed = this.state.tasks.filter(
      (task) => task.status === this.TASK_STATUS.COMPLETED
    ).length;
    const pending = this.state.tasks.filter(
      (task) => task.status === this.TASK_STATUS.PENDING
    ).length;

    // Calcular tareas vencidas
    const today = new Date();
    const overdue = this.state.tasks.filter(
      (task) =>
        task.status === this.TASK_STATUS.PENDING &&
        task.dueDate &&
        new Date(task.dueDate) < today
    ).length;

    // Calcular productividad
    const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Actualizar DOM
    document.getElementById("total-tasks").textContent = total;
    document.getElementById("completed-tasks").textContent = completed;
    document.getElementById("pending-tasks").textContent = pending;
    document.getElementById("overdue-tasks").textContent = overdue;
  }

  /**
   * Renderiza los gráficos del dashboard
   */
  renderCharts() {
    // Implementar gráficos con Chart.js
    this.renderTasksPieChart();
    this.renderWeeklyChart();
    this.renderCategoryChart();
    this.renderMonthlyTrendChart();
    this.renderPriorityChart();
  }

  /**
   * Gráfico de distribución de tareas
   */
  renderTasksPieChart() {
    const ctx = document.getElementById("tasksPieChart")?.getContext("2d");
    if (!ctx) return;

    const completed = this.state.tasks.filter(
      (t) => t.status === this.TASK_STATUS.COMPLETED
    ).length;
    const pending = this.state.tasks.filter(
      (t) => t.status === this.TASK_STATUS.PENDING
    ).length;
    const overdue = this.state.tasks.filter(
      (t) =>
        t.status === this.TASK_STATUS.PENDING &&
        t.dueDate &&
        new Date(t.dueDate) < new Date()
    ).length;

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completadas", "Pendientes", "Vencidas"],
        datasets: [
          {
            data: [completed, pending, overdue],
            backgroundColor: ["#4cc9f0", "#f8961e", "#f72585"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }

  /**
   * Gráfico de productividad semanal
   */
  renderWeeklyChart() {
    const ctx = document.getElementById("weeklyChart")?.getContext("2d");
    if (!ctx) return;

    // Datos de ejemplo para la productividad semanal
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        datasets: [
          {
            label: "Tareas Completadas",
            data: [12, 19, 8, 15, 12, 5, 3],
            borderColor: "#4361ee",
            backgroundColor: "rgba(67, 97, 238, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  /**
   * Gráfico de tareas por categoría
   */
  renderCategoryChart() {
    const ctx = document.getElementById("categoryChart")?.getContext("2d");
    if (!ctx) return;

    const categoryCounts = this.CATEGORIES.reduce((acc, category) => {
      acc[category] = this.state.tasks.filter(
        (task) => task.category === category
      ).length;
      return acc;
    }, {});

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Trabajo", "Personal", "Estudio", "Salud", "Otro"],
        datasets: [
          {
            label: "Tareas por Categoría",
            data: Object.values(categoryCounts),
            backgroundColor: [
              "#4361ee",
              "#7209b7",
              "#4cc9f0",
              "#f8961e",
              "#6c757d",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  /**
   * Gráfico de tendencias mensuales
   */
  renderMonthlyTrendChart() {
    const ctx = document.getElementById("monthlyTrendChart")?.getContext("2d");
    if (!ctx) return;

    // Datos de ejemplo para tendencias mensuales
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
        datasets: [
          {
            label: "Tareas Creadas",
            data: [65, 59, 80, 81, 56, 72],
            borderColor: "#4361ee",
            backgroundColor: "transparent",
          },
          {
            label: "Tareas Completadas",
            data: [45, 48, 65, 70, 52, 68],
            borderColor: "#4cc9f0",
            backgroundColor: "transparent",
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  /**
   * Gráfico de distribución de prioridades
   */
  renderPriorityChart() {
    const ctx = document.getElementById("priorityChart")?.getContext("2d");
    if (!ctx) return;

    const priorityCounts = Object.values(this.PRIORITIES).reduce(
      (acc, priority) => {
        acc[priority] = this.state.tasks.filter(
          (task) => task.priority === priority
        ).length;
        return acc;
      },
      {}
    );

    new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: ["Alta", "Media", "Baja"],
        datasets: [
          {
            data: [
              priorityCounts.high,
              priorityCounts.medium,
              priorityCounts.low,
            ],
            backgroundColor: ["#f72585", "#f8961e", "#4cc9f0"],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  /**
   * Renderiza la lista de tareas
   */
  renderTasks() {
    const container = document.getElementById("tasks-list");
    if (!container) return;

    let filteredTasks = this.getFilteredTasks();

    if (filteredTasks.length === 0) {
      container.innerHTML = this.getEmptyStateHTML();
      return;
    }

    container.innerHTML = filteredTasks
      .map((task) => this.renderTaskItem(task))
      .join("");
    this.attachTaskEventListeners();
  }

  /**
   * Obtiene las tareas filtradas según los criterios actuales
   */
  getFilteredTasks() {
    return this.state.tasks.filter((task) => {
      // Filtro por estado
      if (
        this.state.currentFilter !== "all" &&
        task.status !== this.state.currentFilter
      ) {
        return false;
      }

      // Filtro por prioridad
      if (
        this.state.priorityFilter &&
        this.state.priorityFilter !== "all" &&
        task.priority !== this.state.priorityFilter
      ) {
        return false;
      }

      // Filtro por categoría
      if (
        this.state.categoryFilter &&
        this.state.categoryFilter !== "all" &&
        task.category !== this.state.categoryFilter
      ) {
        return false;
      }

      // Búsqueda
      if (this.state.searchQuery) {
        const searchTerm = this.state.searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(searchTerm);
        const matchesDescription =
          task.description?.toLowerCase().includes(searchTerm) || false;
        const matchesTags =
          task.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          false;

        if (!matchesTitle && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Renderiza un elemento de tarea individual
   */
  renderTaskItem(task) {
    const isOverdue =
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status === this.TASK_STATUS.PENDING;
    const statusClass =
      task.status === this.TASK_STATUS.COMPLETED ? "completed" : "";
    const priorityClass = `priority-${task.priority}`;

    return `
            <div class="task-item" data-task-id="${task.id}">
                <div class="task-checkbox ${
                  task.status === this.TASK_STATUS.COMPLETED ? "checked" : ""
                }" 
                     data-task-id="${task.id}">
                    ${task.status === this.TASK_STATUS.COMPLETED ? "✓" : ""}
                </div>
                <div class="task-content">
                    <div class="task-title ${statusClass}">
                        ${task.title}
                        ${
                          isOverdue
                            ? '<span class="task-tag priority-high">Vencida</span>'
                            : ""
                        }
                    </div>
                    ${
                      task.description
                        ? `<div class="task-description">${task.description}</div>`
                        : ""
                    }
                    <div class="task-meta">
                        <span class="task-tag ${priorityClass}">${this.getPriorityLabel(
      task.priority
    )}</span>
                        <span class="task-tag category">${this.getCategoryLabel(
                          task.category
                        )}</span>
                        ${
                          task.dueDate
                            ? `<span class="task-date"><i class="fas fa-calendar"></i> ${this.formatDate(
                                task.dueDate
                              )}</span>`
                            : ""
                        }
                        ${
                          task.tags && task.tags.length > 0
                            ? `<span class="task-tags"><i class="fas fa-tags"></i> ${task.tags
                                .slice(0, 2)
                                .join(", ")}</span>`
                            : ""
                        }
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn btn-sm btn-secondary edit-task" data-task-id="${
                      task.id
                    }">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-task" data-task-id="${
                      task.id
                    }">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
  }

  /**
   * Obtiene la etiqueta de prioridad
   */
  getPriorityLabel(priority) {
    const labels = {
      [this.PRIORITIES.HIGH]: "Alta",
      [this.PRIORITIES.MEDIUM]: "Media",
      [this.PRIORITIES.LOW]: "Baja",
    };
    return labels[priority] || priority;
  }

  /**
   * Obtiene la etiqueta de categoría
   */
  getCategoryLabel(category) {
    const labels = {
      work: "Trabajo",
      personal: "Personal",
      study: "Estudio",
      health: "Salud",
      other: "Otro",
    };
    return labels[category] || category;
  }

  /**
   * Formatea una fecha
   */
  formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  }

  /**
   * Obtiene el HTML para el estado vacío
   */
  getEmptyStateHTML() {
    return `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h3>No hay tareas</h3>
                <p>${
                  this.state.searchQuery
                    ? "No se encontraron tareas que coincidan con tu búsqueda"
                    : "¡Comienza agregando tu primera tarea!"
                }</p>
                ${
                  !this.state.searchQuery
                    ? '<button class="btn btn-primary" id="add-first-task">Agregar Primera Tarea</button>'
                    : ""
                }
            </div>
        `;
  }

  /**
   * Adjunta event listeners a las tareas
   */
  attachTaskEventListeners() {
    // Checkbox para completar tarea
    document.querySelectorAll(".task-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        const taskId = e.target.dataset.taskId;
        this.toggleTaskStatus(taskId);
      });
    });

    // Editar tarea
    document.querySelectorAll(".edit-task").forEach((button) => {
      button.addEventListener("click", (e) => {
        const taskId = e.target.closest(".edit-task").dataset.taskId;
        this.openTaskModal(taskId);
      });
    });

    // Eliminar tarea
    document.querySelectorAll(".delete-task").forEach((button) => {
      button.addEventListener("click", (e) => {
        const taskId = e.target.closest(".delete-task").dataset.taskId;
        this.deleteTask(taskId);
      });
    });

    // Agregar primera tarea
    const addFirstTaskBtn = document.getElementById("add-first-task");
    if (addFirstTaskBtn) {
      addFirstTaskBtn.addEventListener("click", () => {
        this.openTaskModal();
      });
    }
  }

  /**
   * Cambia el estado de una tarea
   */
  toggleTaskStatus(taskId) {
    const taskIndex = this.state.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;

    const task = this.state.tasks[taskIndex];
    const newStatus =
      task.status === this.TASK_STATUS.COMPLETED
        ? this.TASK_STATUS.PENDING
        : this.TASK_STATUS.COMPLETED;

    this.state.tasks[taskIndex] = {
      ...task,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    this.renderTasks();
    this.updateStats();
    this.saveData();

    const action =
      newStatus === this.TASK_STATUS.COMPLETED
        ? "completada"
        : "marcada como pendiente";
    this.showNotification(`Tarea ${action}`, "success");
  }

  /**
   * Elimina una tarea
   */
  deleteTask(taskId) {
    const task = this.state.tasks.find((t) => t.id === taskId);
    if (!task) return;

    if (
      confirm(`¿Estás seguro de que quieres eliminar la tarea "${task.title}"?`)
    ) {
      this.state.tasks = this.state.tasks.filter((t) => t.id !== taskId);
      this.renderTasks();
      this.updateStats();
      this.saveData();
      this.showNotification("Tarea eliminada correctamente", "success");
    }
  }

  /**
   * Configura el calendario
   */
  setupCalendar() {
    document.getElementById("prev-month").addEventListener("click", () => {
      this.state.currentDate.setMonth(this.state.currentDate.getMonth() - 1);
      this.renderCalendar();
    });

    document.getElementById("next-month").addEventListener("click", () => {
      this.state.currentDate.setMonth(this.state.currentDate.getMonth() + 1);
      this.renderCalendar();
    });
  }

  /**
   * Renderiza el calendario
   */
  renderCalendar() {
    const calendarGrid = document.getElementById("calendar-grid");
    const currentMonth = document.getElementById("current-month");

    if (!calendarGrid || !currentMonth) return;

    // Actualizar título del mes
    const options = { year: "numeric", month: "long" };
    currentMonth.textContent = this.state.currentDate.toLocaleDateString(
      "es-ES",
      options
    );

    // Generar calendario
    calendarGrid.innerHTML = this.generateCalendarHTML();
  }

  /**
   * Genera el HTML del calendario
   */
  generateCalendarHTML() {
    const year = this.state.currentDate.getFullYear();
    const month = this.state.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const startDay = firstDay.getDay();
    const days = [];

    // Días de la semana
    const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    days.push(
      ...weekdays.map((day) => `<div class="calendar-day header">${day}</div>`)
    );

    // Días vacíos al inicio
    for (let i = 0; i < startDay; i++) {
      const prevMonthDay = new Date(year, month, -i);
      days.push(
        `<div class="calendar-day other-month">${prevMonthDay.getDate()}</div>`
      );
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split("T")[0];
      const dayTasks = this.getTasksForDate(dateStr);

      days.push(`
                <div class="calendar-day">
                    <div class="calendar-date">${day}</div>
                    <div class="calendar-tasks">
                        ${dayTasks
                          .map(
                            (task) => `
                            <div class="calendar-task" style="background: ${this.getPriorityColor(
                              task.priority
                            )}">
                                ${task.title}
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            `);
    }

    return days.join("");
  }

  /**
   * Obtiene las tareas para una fecha específica
   */
  getTasksForDate(dateStr) {
    return this.state.tasks
      .filter(
        (task) =>
          task.dueDate === dateStr && task.status !== this.TASK_STATUS.COMPLETED
      )
      .slice(0, 3); // Máximo 3 tareas por día
  }

  /**
   * Obtiene el color según la prioridad
   */
  getPriorityColor(priority) {
    const colors = {
      [this.PRIORITIES.HIGH]: "#f72585",
      [this.PRIORITIES.MEDIUM]: "#f8961e",
      [this.PRIORITIES.LOW]: "#4cc9f0",
    };
    return colors[priority] || "#6c757d";
  }

  /**
   * Configura la sección de configuración
   */
  setupSettings() {
    document.getElementById("theme-select").addEventListener("change", (e) => {
      this.changeTheme(e.target.value);
    });

    document.getElementById("reset-data").addEventListener("click", () => {
      this.resetData();
    });
  }

  /**
   * Cambia el tema de la aplicación
   */
  changeTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.saveData();
    this.showNotification("Tema cambiado correctamente", "success");
  }

  /**
   * Restablece los datos de la aplicación
   */
  resetData() {
    if (
      confirm(
        "¿Estás seguro de que quieres restablecer todos los datos? Esta acción no se puede deshacer."
      )
    ) {
      localStorage.removeItem(this.STORAGE_KEY);
      this.state.tasks = [];
      this.renderTasks();
      this.updateStats();
      this.showNotification("Datos restablecidos correctamente", "success");
    }
  }

  /**
   * Renderiza la sección de configuración
   */
  renderSettings() {
    // Cargar configuración actual
    const settings = this.getCurrentSettings();
    document.getElementById("theme-select").value = settings.theme;
  }

  /**
   * Configura eventos globales
   */
  setupGlobalEvents() {
    // Cerrar modales al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.classList.remove("active");
      }
    });

    // Tecla Escape para cerrar modales
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal.active").forEach((modal) => {
          modal.classList.remove("active");
        });
      }
    });
  }

  /**
   * Muestra una notificación
   */
  showNotification(message, type = "info") {
    // Implementar sistema de notificaciones
    console.log(`[${type.toUpperCase()}] ${message}`);

    // Aquí se implementaría el sistema visual de notificaciones
    const notification = document.createElement("div");
    notification.className = `notification-item ${type}`;
    notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${this.getNotificationTitle(
                  type
                )}</div>
                <div class="notification-message">${message}</div>
            </div>
        `;

    const notificationsList = document.getElementById("notifications-list");
    if (notificationsList) {
      notificationsList.appendChild(notification);

      // Auto-eliminar después de 5 segundos
      setTimeout(() => {
        notification.remove();
      }, 5000);
    }
  }

  /**
   * Obtiene el icono para el tipo de notificación
   */
  getNotificationIcon(type) {
    const icons = {
      success: "check-circle",
      error: "exclamation-triangle",
      warning: "exclamation-circle",
      info: "info-circle",
    };
    return icons[type] || "info-circle";
  }

  /**
   * Obtiene el título para el tipo de notificación
   */
  getNotificationTitle(type) {
    const titles = {
      success: "Éxito",
      error: "Error",
      warning: "Advertencia",
      info: "Información",
    };
    return titles[type] || "Información";
  }

  /**
   * Exporta los datos de la aplicación
   */
  exportData() {
    const data = {
      tasks: this.state.tasks,
      settings: this.getCurrentSettings(),
      exportDate: new Date().toISOString(),
      version: "1.0.0",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `taskflow-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showNotification("Datos exportados correctamente", "success");
  }

  /**
   * Importa datos a la aplicación
   */
  importData() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);

          if (this.validateImportData(data)) {
            this.state.tasks = data.tasks || [];
            this.applySettings(data.settings || {});
            this.saveData();
            this.renderTasks();
            this.updateStats();
            this.showNotification("Datos importados correctamente", "success");
          } else {
            this.showNotification(
              "El archivo de importación no es válido",
              "error"
            );
          }
        } catch (error) {
          this.showNotification("Error al importar los datos", "error");
          console.error("Import error:", error);
        }
      };
      reader.readAsText(file);
    };

    input.click();
  }

  /**
   * Valida los datos de importación
   */
  validateImportData(data) {
    return (
      data && Array.isArray(data.tasks) && typeof data.settings === "object"
    );
  }

  /**
   * Renderiza las analíticas
   */
  renderAnalytics() {
    this.renderCharts();
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.taskManager = new TaskManager();
});
