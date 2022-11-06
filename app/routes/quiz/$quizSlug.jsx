import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { createAnswer } from "~/models/answer.server";
import { getQuiz } from "~/models/quiz.server";
import { requireUserId } from "~/session.server";


export async function loader({ params}) {
    const quiz = await getQuiz({slug: params.quizSlug});    

    if (!quiz) {
        throw new Response("Not Found", { status: 404});
    }
    return json({quiz});
}

export async function action({ request, params }) {
    const userId = await requireUserId(request);
    const quizSlug = params.quizSlug;

    const formData = await request.formData();
    const answer = formData.get('answer');

    if (typeof answer !== "string" || answer.length === 0) {
        return json(
            { errors: {answer: "Answer is required"}},
            { status: 400 }
        );
    }

    await createAnswer({answer, userId, quizSlug});

    return redirect(`/quiz/${quizSlug}/results`);
}

export default function QuizQuestion() {
    const data = useLoaderData();
    const { quiz } = data;

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold">{quiz.question}</h3>            
            <Form
                method="post"
                className="flex flex-col p-3 gap-4 max-w-xl"
            >
                <div>
                    <label className="flex w-full flex-col gap-1">
                        <span>Answer: </span>
                        <input
                            name="answer"
                            className="flex-1 rounded-md border-2 border-blue-500 px-2 py-1 text-lg"
                        />
                    </label>
                </div>

                <div className="text-right">
                    <button
                        type="submit"
                        className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                    >
                        Save
                    </button>
                </div>
            </Form> 
        </div>        
    )
}