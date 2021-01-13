const fs = require("fs");

const faker = require("faker");
faker.seed(69);

const { userImages } = require("./data/userImages");
const { subjects } = require("./data/subjects");
const { weekdays } = require("./data/weekdays");

const DATA_LENGTH = userImages.length;

const userIds = [];
const data = { users: [] };

for (let i = 0; i < DATA_LENGTH; i++) {
  userIds.push(faker.random.uuid());
}

for (let i = 0; i < DATA_LENGTH; i++) {
  const schedule = [];
  for (let w = 0; w < 5; w++) {
    const worksToday = faker.random.boolean();
    worksToday &&
      schedule.push({
        weekday: weekdays[w],
        from: faker.random.number({ min: 6, max: 12 }),
        to: faker.random.number({ min: 13, max: 18 }),
      });
  }

  const numOfFavorites = faker.random.number({
    min: 10,
    max: 30,
  });
  const favoriteTeachersIds = [];
  for (let id = 0; id < numOfFavorites; id++) {
    const index = faker.random.number({
      min: 0,
      max: DATA_LENGTH - 1,
    });
    favoriteTeachersIds.push(userIds[index]);
  }

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  data.users.push({
    id: userIds[i],
    firstName,
    lastName,
    email: faker.internet.email(firstName, lastName),
    password: "123456",
    avatarUrl: userImages[i],
    whatsapp: faker.phone.phoneNumber(),
    bio: faker.lorem.words(5),
    isTeacher: true,
    subject: subjects[Math.round(Math.random() * subjects.length)],
    perHourCost: faker.random.number({ min: 10, max: 1000, precision: 2 }),
    schedule,
    favoriteTeachersIds,
  });
}
fs.writeFile("db.json", JSON.stringify(data), (err) => {
  console.log(err);
});
