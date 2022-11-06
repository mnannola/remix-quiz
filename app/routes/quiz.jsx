import { Form, Link, Outlet } from "@remix-run/react"

export default function QuizIndex() {
    return (
        <div className="flex h-full min-h-screen flex-col">
            <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
                <h1 className="text-3xl font-bold">
                    <Link to=".">Remix Quiz</Link>
                </h1>                
                <Form action="/logout" method="post">
                    <button
                        type="submit"
                        className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                    >
                        Logout
                    </button>
                </Form>
            </header>
            {/* <div>
                <h3>Quiz Main Page</h3>
                <Link to="admin" className="text-blue-500">
                    Admin
                </Link>
            </div>      */}       
            {}
            <Outlet />
        </div>
    )
}