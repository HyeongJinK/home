var express = require('express');
var router = express.Router();

/**
 * Dashboard
 */
router.get('/dashboard/analytics', function(req, res, next) {
  res.render('template/dashboard/analytics', { menu: ['템플릿', 'Dashboard', 'Analytics Dashboard'] });
});
router.get('/dashboard/marketing', function(req, res, next) {
    res.render('template/dashboard/marketing', { menu: ['템플릿', 'Dashboard', 'Marketing Dashboard'] });
  });
router.get('/dashboard/social_wall', function(req, res, next) {
    res.render('template/dashboard/social_wall', { menu: ['템플릿', 'Dashboard', 'Social Wall'] });
});

/**
 * Smart
 */

router.get('/smart/app_layout', function(req, res, next) {
    res.render('template/smart/app_layout', { menu: ['템플릿', 'Smart', 'Social Wall'] });
});
router.get('/smart/app_layout', function(req, res, next) {
    res.render('template/smart/app_layout', { menu: ['템플릿', 'Smart', 'Social Wall'] });
});
router.get('/smart/app_layout', function(req, res, next) {
    res.render('template/smart/app_layout', { menu: ['템플릿', 'Smart', 'Social Wall'] });
});

/**
 * Graphs
 */
router.get('/graphs/app_layout', function(req, res, next) {
    res.render('template/graphs/app_layout', { menu: ['템플릿', 'Graphs', 'Social Wall'] });
});

/**
 * Tables
 */
router.get('/table/app_layout', function(req, res, next) {
    res.render('template/table/app_layout', { menu: ['템플릿', 'Table', 'Social Wall'] });
});
/**
 * Forms
 */
router.get('/forms/app_layout', function(req, res, next) {
    res.render('template/forms/app_layout', { menu: ['템플릿', 'Forms', 'Social Wall'] });
});
/**
 * UI Elements
 */
router.get('/ul_elements/app_layout', function(req, res, next) {
    res.render('template/ul_elements/app_layout', { menu: ['템플릿', 'Ul Elements', 'Social Wall'] });
});
/**
 * Widgets
 */
router.get('/widgets/app_layout', function(req, res, next) {
    res.render('template/widgets/app_layout', { menu: ['템플릿', 'Widgets', 'Social Wall'] });
});
/**
 * Cool Features
 */
router.get('/cool_features/app_layout', function(req, res, next) {
    res.render('template/cool_features/app_layout', { menu: ['템플릿', 'Cool Features', 'Social Wall'] });
});
/**
 * App Views
 */
router.get('/app_views/app_layout', function(req, res, next) {
    res.render('template/app_views/app_layout', { menu: ['템플릿', 'App Views', 'Social Wall'] });
});
/**
 * E-Commerce
 */
router.get('/e_commerce/app_layout', function(req, res, next) {
    res.render('template/e_commerce/app_layout', { menu: ['템플릿', 'E-Commerce', 'Social Wall'] });
});
/**
 * Miscellaneous
 */
router.get('/miscellaneous/app_layout', function(req, res, next) {
    res.render('template/miscellaneous/app_layout', { menu: ['템플릿', 'Miscellaneous', 'Social Wall'] });
});

module.exports = router;