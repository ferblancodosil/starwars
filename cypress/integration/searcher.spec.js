describe('The starwars app', () => {
  it('load and search successfully', () => {
    cy.visit('http://localhost:3000')

    cy.get('input')
      .should('contain.value','')
      .type('LuKe Tatooine')

    cy.get('button')
      .should('contain.text','Go')
      .should('be.enabled')
      .click()

    cy.url().should('include', '?query=LuKe+Tatooine')

    cy.get('.card').should('have.length', 3)

    cy.get('input')
      .clear()
      .type('luke{enter}')

    cy.get('.card').should('have.length', 4)
    cy.url().should('include', '?query=luke')
  })

  it('open details successfully', () => {
    cy.visit('http://localhost:3000?query=LuKe+Tatooine')
    cy.get('.card').first().click()
    cy.url().should('include', '/details/')
    cy.get('.title').first().contains('A New Hope')
    cy.get('.subtitle').first().contains('Episode 4')
    cy.get('.card .director').first().contains('Director: George Lucas')
    cy.get('.card .producer').first().contains('Producer: Gary Kurtz Rick McCallum')
    cy.get('.card .release_date').first().contains('Release date: 25-05-1977')
  })

  it('open searcher card successfully', () => {
    cy.visit('http://localhost:3000?query=LuKe+Tatooine')
    cy.get('.card .title').first().contains('A New Hope')
    cy.get('.card .episode').first().contains('Episode 4')
    cy.get('.card .director').first().contains('Director: George Lucas')
    cy.get('.card .release_date > span').eq(0).contains('25-05-1977')
    cy.get('.card .release_date').eq(1).then(element => {
      const text = element.text()
      expect(text).to.match(new RegExp('([0-9]+ years ago)', 'gi'))
    })
  })

  it('Empty search', () => {
    cy.visit('http://localhost:3000')
    cy.get('.card').should('have.length', 0)
    cy.get('button').click()
    cy.url().should('include', '?query=')
    cy.get('.card').should('have.length', 6)
  })
})
