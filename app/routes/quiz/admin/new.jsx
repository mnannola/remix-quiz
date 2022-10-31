import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import { createQuiz } from "~/models/quiz.server";
import { requireUserId } from "~/session.server";

export async function action({ request }) {
    const userId = await requireUserId(request);

    const formData = await request.formData();
    const title = formData.get('title');
    const question = formData.get('question');

    if (typeof title !== "string" || title.length === 0) {
        return json(
            { errors: { title: "Title is required", question: null } },
            { status: 400 }
        );
    }
    
    if (typeof question !== "string" || question.length === 0) {
        return json(
            { errors: { title: null, question: "Question is required" } },
            { status: 400 }
        );
    }
    
    await createQuiz({title, question, userId});

    return redirect(`/quiz/admin`);
}

export default function QuizAdminNew() {
    const actionData = useActionData();

    return (
        <Form
            method="post"
            className="flex flex-col p-3 gap-4 max-w-xl"
        >
            <div>
                <label className="flex w-full flex-col gap-1">
                    <span>Title: </span>
                    {actionData?.errors?.title ? (
                        <em className="text-red-600">{actionData.errors.title}</em>
                    ) : null}
                    <input
                        name="title"
                        className="flex-1 rounded-md border-2 border-blue-500 text-lg px-2"

                    />
                </label>                
            </div>

            <div>
                <label className="flex w-full flex-col gap-1">
                    <span>Question: </span>
                    {actionData?.errors?.question ? (
                        <em className="text-red-600">{actionData.errors.question}</em>
                    ) : null}
                    <input
                        name="question"
                        className="w-full flex-1 rounded-md border-2 border-blue-500 px-2"
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
    );
}