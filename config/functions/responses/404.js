'use strict';

module.exports = async (ctx) => {
  return ctx.notFound('Tyvärr, denna sidan finns inte.');
};