users={
    name,
    surname,
    email,
    password,
    gradedAnswers:[{
        idAnswer
    }]
}

question = {
    user,
    title,
    description,
    answers:[
        answer
    ]
}

answers = {
    question,
    user,
    answer,
    score
}