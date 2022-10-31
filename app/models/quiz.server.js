import { prisma } from "~/db.server";

export function createQuiz({question, title, userId}) {
    console.log('question: ', question);
    return prisma.quiz.create({
        data: {
            title,
            question,
            userId
        }
    })
}

export function getQuizListItems({ userId }) {
    return prisma.quiz.findMany({
        where: { userId },
        select: { slug: true, title: true, question: true},
        orderBy: { createdAt: "desc"},
    });
}

export function getQuiz({ slug }) {
    return prisma.quiz.findFirst({
        select: {slug: true, title: true, question: true},
        where: { slug },
    });
}