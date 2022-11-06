import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAnswersByQuiz } from "~/models/answer.server";
import { getQuiz } from "~/models/quiz.server";

export const loader = async ({ params }) => {
    const quiz = await getQuiz({quizSlug: params.quizSlug});
    const answers = await getAnswersByQuiz({quizSlug: params.quizSlug});
    debugger;
    return json({answers, quiz});
}
export default function QuizSlugResults() {
    const data = useLoaderData();
    const { answers, quiz } = data;
    return (
        <div className="p-4 gap-4 max-w-xl">
            <h3>Results for "{quiz.question}"</h3>
            <table className="border-collapse table-auto w-full text-sm my-7">
                <thead>
                    <tr>
                        <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left"
                        >
                            User
                        </th
                        >
                        <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left"
                        >
                            Answer
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {answers.map((answer) => (
                        <tr key={answer.id}>
                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500"
                            >
                                {answer.user.email}
                            </td>
                            <td className="border-b border-slate-100 p-4 text-slate-500"
                            >
                                {answer.answer}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}