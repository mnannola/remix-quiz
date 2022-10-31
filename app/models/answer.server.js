import { prisma } from "~/db.server";

export function createAnswer({answer, userId, quizSlug}) {
    return prisma.answer.create({
        data: {
            answer,
            user: {
                connect: {
                    id: userId,
                }
            },
            quiz: {
                connect: {
                    slug: quizSlug,
                },
            },
        },
    });
}

export function getAnswersByQuiz({quizSlug}) {
    return prisma.answer.findMany({
        where: { quizSlug },
        select: { answer: true, user: true },
        orderBy: { createdAt: "desc"},
    });
}

export function getAnswerByUserId({quizSlug, userId}) {
    return prisma.answer.findFirst({
        where: {id: userId, quizSlug},
        select: {answer: true}
    });
}