import { redirect } from "@remix-run/node";

export function loader() {
    return redirect('/quiz/admin');
}

export default function QuizIndex() {
    return(<></>);
}