import CreateTaskForm from "@/components/CreateTaskForm";

export default function CreateTaskPage() {
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-gray-700">
            <h1 className="text-2xl font-bold mb-4">Create a New Task</h1>
            <CreateTaskForm />
        </div>
    );
}