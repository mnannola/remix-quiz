import { Link, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/server-runtime"
import { getQuizListItems } from "~/models/quiz.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }) => {
    const userId = await requireUserId(request);
    return json({quizes: await getQuizListItems({ userId })});
}

export default function QuizAdminIndex() {
    const data = useLoaderData();
    return (
        <div className="p-4">
            <Link to="new" className="text-blue-500">+ New Quiz</Link>
            <div className="py-4">
                {data.quizes.length === 0 ? (
                        <p className="p-4">No quizes yet</p>
                    ) : (
                        <table className="border-collapse table-auto w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="border-b  font-medium p-4 pt-0 pb-3 text-slate-400 text-left"
                                    >
                                        Question
                                    </th>
                                    <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left"
                                    >
                                        Link
                                    </th>
                                    <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left"
                                    >
                                        Results
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {data.quizes.map((quiz) => (
                                    <tr key={quiz.slug}>                                        
                                        <td className="border-b border-slate-100 p-4 text-slate-500"
                                        >
                                            {quiz.question}
                                        </td>
                                        <td className="border-b border-slate-100 p-4 pr-8 text-slate-500"
                                        >
                                            <Link
                                                to={`/quiz/${quiz.slug}`}
                                                className="text-blue-500"
                                            >
                                                Quiz Link
                                            </Link>
                                        </td>
                                        <td className="border-b border-slate-100 p-4 pr-8 text-slate-500"
                                        >
                                            <Link 
                                                to={`/quiz/${quiz.slug}/results`}
                                                className="text-blue-500"
                                            >
                                                Results
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
            </div>                       
        </div>        
    )
}