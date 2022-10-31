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
    console.log('here is data: ', data);
    return (
        <div className="p-4 gap-4">
            <h3>Results for {data.quiz.title}</h3>
            <table className="border-collapse table-auto w-full text-sm">
                <thead>
                    <tr>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                        >
                            User
                        </th
                        >
                        <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                        >
                            Answer
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.answers.map((answer) => (
                        <tr key={answer.id}>
                            <td>{answer.user.email}</td>
                            <td>{answer.answer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}