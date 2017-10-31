
20.times do
  Todo.create(
    name: "これをする",
    status: rand(1..3),
    assignee: "かなさん",
    mandays: 1
  )
end

