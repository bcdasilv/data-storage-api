// The existing tests in this file should not be modified,
// but you can add more tests if needed.

const supertest = require('supertest')
const server = require('./server.js')

describe('data-storage-api-node', () => {
  test('PUT -- happy path', async () => {
    const putResult = await supertest(server)
      .put('/data/cats')
      .send({ name: 'Ada' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(putResult.body).toBeTruthy()
    expect(typeof putResult.body).toBe('object')
    expect(putResult.body).toHaveProperty('oid')
    expect(typeof putResult.body.oid).toBe('string')
    expect(putResult.body.oid.length).toBeGreaterThan(0)
    expect(putResult.body).toHaveProperty('size')
    expect(typeof putResult.body.size).toBe('number')
    expect(putResult.body.size).toBeGreaterThan(0)
  })

  test('PUT -- Failure path with duplicate', async () => {
    const putResultSuccess = await supertest(server)
      .put('/data/dogs')
      .send({ name: 'Ringo' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(putResultSuccess.body).toBeTruthy()
    expect(typeof putResultSuccess.body).toBe('object')
    expect(putResultSuccess.body).toHaveProperty('oid')
    expect(typeof putResultSuccess.body.oid).toBe('string')
    expect(putResultSuccess.body.oid.length).toBeGreaterThan(0)
    expect(putResultSuccess.body).toHaveProperty('size')
    expect(typeof putResultSuccess.body.size).toBe('number')
    expect(putResultSuccess.body.size).toBeGreaterThan(0) 

    const putResultFailure = await supertest(server)
      .put('/data/dogs')
      .send({ name: 'Ringo' })
      .set('Accept', 'application/json')
      .expect(406)
  })

  test('PUT -- Happy path with duplicate across different repo', async () => {
    const putResultRoscoDog = await supertest(server)
      .put('/data/dogs')
      .send({ name: 'Rosco' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(putResultRoscoDog.body).toBeTruthy()
    expect(typeof putResultRoscoDog.body).toBe('object')
    expect(putResultRoscoDog.body).toHaveProperty('oid')
    expect(typeof putResultRoscoDog.body.oid).toBe('string')
    expect(putResultRoscoDog.body.oid.length).toBeGreaterThan(0)
    expect(putResultRoscoDog.body).toHaveProperty('size')
    expect(typeof putResultRoscoDog.body.size).toBe('number')
    expect(putResultRoscoDog.body.size).toBeGreaterThan(0) 

    const putResultSuccessRoscoCat = await supertest(server)
      .put('/data/cats')
      .send({ name: 'Rosco' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

      expect(putResultSuccessRoscoCat.body).toBeTruthy()
      expect(typeof putResultSuccessRoscoCat.body).toBe('object')
      expect(putResultSuccessRoscoCat.body).toHaveProperty('oid')
      expect(typeof putResultSuccessRoscoCat.body.oid).toBe('string')
      expect(putResultSuccessRoscoCat.body.oid.length).toBeGreaterThan(0)
      expect(putResultSuccessRoscoCat.body).toHaveProperty('size')
      expect(typeof putResultSuccessRoscoCat.body.size).toBe('number')
      expect(putResultSuccessRoscoCat.body.size).toBeGreaterThan(0) 
  })

  test('GET', async () => {
    const putResult1 = await supertest(server)
      .put('/data/cats')
      .send({ name: 'Boo' })
      .set('Accept', 'application/json')
      .expect(201)

    const putResult2 = await supertest(server)
      .put('/data/cats')
      .send({ name: 'Chester' })
      .set('Accept', 'application/json')
      .expect(201)

    expect(putResult1.body.oid).not.toBe(putResult2.body.oid)

    await supertest(server)
      .get(`/data/cats/${putResult1.body.oid}`)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual({ name: 'Boo' })
      })

    await supertest(server)
      .get(`/data/cats/${putResult2.body.oid}`)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual({ name: 'Chester' })
      })
  })

  test('GET non-existent object', async () => {
    await supertest(server)
      .get(`/data/cats/noooope`)
      .expect(404)
  })

  test('DELETE', async () => {
    const putResult = await supertest(server)
      .put('/data/cats')
      .send({ name: 'Daisy' })
      .set('Accept', 'application/json')
      .expect(201)

    const hash = putResult.body.oid

    await supertest(server)
      .delete(`/data/cats/${hash}`)
      .expect(200)

    await supertest(server)
      .get(`/data/cats/${hash}`)
      .expect(404)
  })

  test('DELETE non-existent object', async () => {
    await supertest(server)
      .delete(`/data/cats/noooope`)
      .expect(404)
  })

  test('DELETE obj non-existent repo', async () => {
    await supertest(server)
      .delete(`/data/turkey/goble-goble`)
      .expect(404)
  })
})
