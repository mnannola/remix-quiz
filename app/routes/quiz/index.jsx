import { Link } from "@remix-run/react"

export default function QuizIndex() {
    return (
        <div>
            <h3>Quiz Main Page</h3>
            <Link to="admin" className="text-blue-500">
                Admin
            </Link>
        </div>            
    )
}