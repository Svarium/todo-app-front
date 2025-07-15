import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const TaskStatsModal = ({ tasks, onClose }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!tasks || tasks.length === 0) return;

    // Datos para gráfico de últimos 6 meses
    const now = new Date();
    const monthsData = {};
    
    // Inicializar últimos 6 meses
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('es-ES', { month: 'short' });
      monthsData[monthKey] = 0;
    }
    
    // Contar tareas por mes
    tasks.forEach(task => {
      const taskDate = new Date(task.createdAt);
      const monthKey = taskDate.toLocaleDateString('es-ES', { month: 'short' });
      if (monthsData.hasOwnProperty(monthKey)) {
        monthsData[monthKey]++;
      }
    });

    // Crear gráfico
    const ctx = chartRef.current.getContext('2d');
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(monthsData),
        datasets: [{
          label: 'Tareas',
          data: Object.values(monthsData),
          backgroundColor: '#3B82F6',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [tasks]);

  if (!tasks || tasks.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Estadísticas</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          <p className="text-gray-600 text-center">No hay tareas para mostrar</p>
        </div>
      </div>
    );
  }

  // Calcular estadísticas esenciales
  const now = new Date();
  const thisMonth = tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear();
  }).length;

  const conArchivos = tasks.filter(task => task.files && task.files.length > 0).length;
  const totalArchivos = tasks.reduce((total, task) => total + (task.files?.length || 0), 0);

  // Tipo de archivo más común
  const fileTypes = {};
  tasks.forEach(task => {
    if (task.files && task.files.length > 0) {
      task.files.forEach(file => {
        if (file.mimetype) {
          const type = file.mimetype.split('/')[0];
          const typeMap = { 'image': 'Imágenes', 'application': 'Documentos', 'text': 'Texto', 'video': 'Videos' };
          const displayType = typeMap[type] || 'Otros';
          fileTypes[displayType] = (fileTypes[displayType] || 0) + 1;
        }
      });
    }
  });

  const topFileType = Object.keys(fileTypes).length > 0 ? 
    Object.entries(fileTypes).sort((a, b) => b[1] - a[1])[0][0] : 'N/A';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Estadísticas de Tareas</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            ✕
          </button>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
            <div className="text-sm text-blue-800">Total</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{thisMonth}</div>
            <div className="text-sm text-green-800">Este Mes</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{conArchivos}</div>
            <div className="text-sm text-purple-800">Con Archivos</div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{totalArchivos}</div>
            <div className="text-sm text-orange-800">Total Archivos</div>
          </div>
        </div>

        {/* Gráfico */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Últimos 6 Meses</h3>
          <div className="h-48">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>

        {/* Info adicional compacta */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-700">
            <strong>Tipo de archivo más común:</strong> {topFileType}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatsModal;