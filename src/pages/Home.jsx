import TaskForm from "../components/TaskForm";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";

const Home = () => {
  const { user } = useAuth();
  const { tasks, loadingTasks } = useTasks();

return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <TaskForm />

      <h2 className="text-2xl font-bold">Mis Tareas</h2>
      {loadingTasks ? (
        <p>Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p>No tenés tareas todavía.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="border rounded p-4 shadow-sm bg-gray-50"
            >
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">
                Vence: {new Date(task.dueDate).toLocaleDateString()}
              </p>
                        {task.files?.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Archivos:</p>
                <ul className="list-disc ml-6 space-y-1">
                  {task.files.map((file, i) => (
                    <li key={i}>
                      <a
                        href={`http://localhost:3002${file.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
