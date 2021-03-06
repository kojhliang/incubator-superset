/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { DASHBOARD_LIST } from './dashboard_list.helper';

describe('Dashboard card view', () => {
  beforeEach(() => {
    cy.login();
    cy.server();
    cy.visit(DASHBOARD_LIST);
    cy.get('[data-test="card-view"]').click();
  });

  it('should load cards', () => {
    cy.get('[data-test="dashboard-list-view"]');
    cy.get('[data-test="styled-card"]').should('be.visible');
    cy.get('[data-test="styled-card"]').should('have.length', 4);
  });

  it('should allow to favorite/unfavorite dashboard card', () => {
    cy.get("[data-test='card-actions']")
      .first()
      .find("[data-test='favorite-selected']")
      .should('not.exist');
    cy.get("[data-test='card-actions']")
      .find("[data-test='favorite-unselected']")
      .first()
      .click();
    cy.get("[data-test='card-actions']")
      .first()
      .find("[data-test='favorite-selected']")
      .should('be.visible');
    cy.get("[data-test='card-actions']")
      .first()
      .find("[data-test='favorite-unselected']")
      .should('not.exist');

    cy.get("[data-test='card-actions']")
      .first()
      .find("[data-test='favorite-unselected']")
      .should('not.exist');
    cy.get("[data-test='card-actions']")
      .first()
      .find("[data-test='favorite-selected']")
      .click();
    cy.get("[data-test='card-actions']")
      .first()
      .find("[data-test='favorite-unselected']")
      .should('be.visible');
    cy.get("[data-test='card-actions']")
      .first()
      .find("[data-test='favorite-selected']")
      .should('not.exist');
  });

  xit('should sort correctly', () => {
    // sort alphabetical
    cy.get('.Select__control').last().should('be.visible');
    cy.get('.Select__control').last().click({ force: true });
    cy.get('.Select__menu').contains('Alphabetical').click();
    cy.get('[data-test="dashboard-list-view"]').should('be.visible');
    // TODO this line was flaky
    cy.get('[data-test="styled-card"]').first().contains('Tabbed Dashboard');
    cy.get('[data-test="styled-card"]').last().contains("World Bank's Data");

    // sort recently modified
    cy.get('.Select__control').last().should('be.visible');
    cy.get('.Select__control').last().click({ force: true });
    cy.get('.Select__menu').contains('Recently Modified').click();
    cy.get('[data-test="dashboard-list-view"]').should('be.visible');
    cy.get('[data-test="styled-card"]').first().contains('Tabbed Dashboard');
    cy.get('[data-test="styled-card"]').last().contains("World Bank's Data");
  });

  it('should delete correctly', () => {
    // show delete modal
    cy.get('[data-test="more-horiz"]').last().trigger('mouseover');
    cy.get('[data-test="dashboard-card-option-delete-button"]')
      .should('be.visible')
      .click();
    cy.get('[data-test="modal-confirm-button"]').should(
      'have.attr',
      'disabled',
    );
    cy.get('[data-test="Please Confirm-modal"]').should('be.visible');
    cy.get("[data-test='delete-modal-input']").type('DELETE');
    cy.get('[data-test="modal-confirm-button"]').should(
      'not.have.attr',
      'disabled',
    );
    cy.get('[data-test="modal-cancel-button"]').click();
  });

  it('should edit correctly', () => {
    // show edit modal
    cy.get('[data-test="more-horiz"]').last().trigger('mouseover');
    cy.get('[data-test="dashboard-card-option-edit-button"]')
      .should('be.visible')
      .click();
    cy.get('[data-test="dashboard-edit-properties-form"]').should('be.visible');
    cy.get('[data-test="dashboard-title-input"]').should('not.have.value');
    cy.get('[data-test="properties-modal-cancel-button"]')
      .contains('Cancel')
      .click();
  });
});
