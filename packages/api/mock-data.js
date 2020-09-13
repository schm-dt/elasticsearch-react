const faker = require('faker/locale/en_AU')

module.exports.createParticipants = (count = 100) => {
  faker.seed(123)

  return Array.from(new Array(count)).map(_ => {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()

    return {
      type: 'participant',
      id: faker.random.uuid(),
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      avatar: faker.image.avatar(),
      streetAddress: faker.address.streetAddress(),
    }
  })
}

module.exports.createCustomers = (count = 100) => {
  faker.seed(345)
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  return Array.from(new Array(count)).map(_ => {
    return {
      type: 'customer',
      id: faker.random.uuid(),
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
    }
  })
}

module.exports.createReports = (count = 100) => {
  faker.seed(567)

  return Array.from(new Array(count)).map(n => ({
    type: 'report',
    id: faker.random.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
  }))
}
