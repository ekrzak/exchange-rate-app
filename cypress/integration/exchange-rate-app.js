/// <reference types="Cypress" />

const NUMBER_OF_CURRENCIES = 161;
const d = new Date();

context('Exchange Rate App', () => {
  
  before(() => {
    cy.visit('/');
  });

  describe('Home page', () => {
    
    it('shows the base currency in the table description', () => {
      cy.get('#description-base').should('have.text', 'USD');
    });

    it('shows the current date in the table description', () => {
      cy.get('#description-rate-date').contains(d.getDate());
    });

    it('shows the rate for the base currency', () => {
      cy.get('#data-table tr').first().should('have.text', 'USD1');
    });

    it('shows a list of currency rates for USD base', () => {
      cy.get('#data-table').find('tr').should('have.length', NUMBER_OF_CURRENCIES);
    });
  });

  describe('View for another currency', () => {
    
    it('picks a currency in the dropdown menu', () => {
      cy.get('#navbarDarkDropdownMenuLink').click();
      cy.contains('ARS').click();
    });

    it('shows the base currency in the table description', () => {
      cy.get('#description-base').should('have.text', 'ARS');
    });

    it('shows the current date in the table description', () => {
      cy.get('#description-rate-date').contains(d.getDate());
    });

    it('shows the rate for the base currency', () => {
      cy.get('#data-table tr').first().should('have.text', 'ARS1');
    });

    it('shows a list of currency rates for ARS base', () => {
      cy.get('#data-table').find('tr').should('have.length', NUMBER_OF_CURRENCIES);
    });

  });

});
