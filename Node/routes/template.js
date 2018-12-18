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

router.get('/smart/app_layouts', function(req, res, next) {
    res.render('template/smart/app_layouts', { menu: ['템플릿', 'Smart', 'Social Wall'] });
});
router.get('/smart/prebuilt_skins', function(req, res, next) {
    res.render('template/smart/prebuilt_skins', { menu: ['템플릿', 'Smart', 'Prebuilt Skins'] });
});
router.get('/smart/app_settings', function(req, res, next) {
    res.render('template/smart/app_settings', { menu: ['템플릿', 'Smart', 'App Settings'] });
});

/**
 * Graphs
 */
router.get('/graphs/float_chart', function(req, res, next) {
    res.render('template/graphs/float_chart', { menu: ['템플릿', 'Graphs', 'Flot chart'] });
});
router.get('/graphs/morris_charts', function(req, res, next) {
    res.render('template/graphs/morris_charts', { menu: ['템플릿', 'Graphs', 'Morris Charts'] });
});
router.get('/graphs/sparklines', function(req, res, next) {
    res.render('template/graphs/sparklines', { menu: ['템플릿', 'Graphs', 'Sparklines'] });
});
router.get('/graphs/easypiecharts', function(req, res, next) {
    res.render('template/graphs/easypiecharts', { menu: ['템플릿', 'Graphs', 'EasyPieCharts'] });
});
router.get('/graphs/dygraphs', function(req, res, next) {
    res.render('template/graphs/dygraphs', { menu: ['템플릿', 'Graphs', 'Dygraphs'] });
});
router.get('/graphs/Chart', function(req, res, next) {
    res.render('template/graphs/Chart', { menu: ['템플릿', 'Graphs', 'Chart.js'] });
});
router.get('/graphs/highcharttable', function(req, res, next) {
    res.render('template/graphs/highcharttable', { menu: ['템플릿', 'Graphs', 'HighchartTable'] });
});

/**
 * Tables
 */
router.get('/tables/normal', function(req, res, next) {
    res.render('template/tables/normal', { menu: ['템플릿', 'Table', 'normal'] });
});
router.get('/tables/data', function(req, res, next) {
    res.render('template/tables/data', { menu: ['템플릿', 'Table', 'data'] });
});
router.get('/tables/jqgrid', function(req, res, next) {
    res.render('template/tables/jqgrid', { menu: ['템플릿', 'Table', 'jqgrid'] });
});
/**
 * Forms
 */
router.get('/forms/form_elements', function(req, res, next) {
    res.render('template/forms/form_elements', { menu: ['템플릿', 'Forms', 'Smart Form Elements'] });
});
router.get('/forms/form_templates', function(req, res, next) {
    res.render('template/forms/form_templates', { menu: ['템플릿', 'Forms', 'Smart Form Layouts'] });
});
router.get('/forms/validation', function(req, res, next) {
    res.render('template/forms/validation', { menu: ['템플릿', 'Forms', 'Smart Form Validation'] });
});
router.get('/forms/bootstrap_forms', function(req, res, next) {
    res.render('template/forms/bootstrap_forms', { menu: ['템플릿', 'Forms', 'Bootstrap Form Elements'] });
});
router.get('/forms/bootstrap_validator', function(req, res, next) {
    res.render('template/forms/bootstrap_validator', { menu: ['템플릿', 'Forms', 'Bootstrap Form Validation'] });
});
router.get('/forms/plugins', function(req, res, next) {
    res.render('template/forms/plugins', { menu: ['템플릿', 'Forms', 'Form Plugins'] });
});
router.get('/forms/wizard', function(req, res, next) {
    res.render('template/forms/wizard', { menu: ['템플릿', 'Forms', 'Wizards'] });
});
router.get('/forms/other_editors', function(req, res, next) {
    res.render('template/forms/other_editors', { menu: ['템플릿', 'Forms', 'Bootstrap Editors'] });
});
router.get('/forms/dropzone', function(req, res, next) {
    res.render('template/forms/dropzone', { menu: ['템플릿', 'Forms', 'Dropzone'] });
});
router.get('/forms/imag_editor', function(req, res, next) {
    res.render('template/forms/imag_editor', { menu: ['템플릿', 'Forms', 'Image Cropping'] });
});
router.get('/forms/ckeditor', function(req, res, next) {
    res.render('template/forms/ckeditor', { menu: ['템플릿', 'Forms', 'CKEditor'] });
});
/**
 * UI Elements
 */
router.get('/ul_elements/general_elements', function(req, res, next) {
    res.render('template/ul_elements/general_elements', { menu: ['템플릿', 'Ul Elements', 'General Elements'] });
});
router.get('/ul_elements/buttons', function(req, res, next) {
    res.render('template/ul_elements/buttons', { menu: ['템플릿', 'Ul Elements', 'Buttons'] });
});
router.get('/ul_elements/icons/fa', function(req, res, next) {
    res.render('template/ul_elements/icons/fa', { menu: ['템플릿', 'Ul Elements', 'Icons', 'Font Awesome'] });
});
router.get('/ul_elements/icons/glyph', function(req, res, next) {
    res.render('template/ul_elements/icons/glyph', { menu: ['템플릿', 'Ul Elements', 'Icons', 'Glyph Icons'] });
});
router.get('/ul_elements/icons/flags', function(req, res, next) {
    res.render('template/ul_elements/icons/flags', { menu: ['템플릿', 'Ul Elements', 'Icons', 'Flags'] });
});
router.get('/ul_elements/grid', function(req, res, next) {
    res.render('template/ul_elements/grid', { menu: ['템플릿', 'Ul Elements', 'Grid'] });
});
router.get('/ul_elements/treeview', function(req, res, next) {
    res.render('template/ul_elements/treeview', { menu: ['템플릿', 'Ul Elements', 'Tree View'] });
});
router.get('/ul_elements/nestable_list', function(req, res, next) {
    res.render('template/ul_elements/nestable_list', { menu: ['템플릿', 'Ul Elements', 'Nestable Lists'] });
});
router.get('/ul_elements/jqui', function(req, res, next) {
    res.render('template/ul_elements/jqui', { menu: ['템플릿', 'Ul Elements', 'JQuery UI'] });
});
router.get('/ul_elements/typography', function(req, res, next) {
    res.render('template/ul_elements/typography', { menu: ['템플릿', 'Ul Elements', 'Typography'] });
});
/**
 * Widgets
 */
router.get('/widgets', function(req, res, next) {
    res.render('template/widgets/widgets', { menu: ['템플릿', 'Widgets', 'Widgets'] });
});
/**
 * Cool Features
 */
router.get('/cool_features/calendar', function(req, res, next) {
    res.render('template/cool_features/calendar', { menu: ['템플릿', 'Cool Features', 'Calendar'] });
});
router.get('/cool_features/app_layout', function(req, res, next) {
    res.render('template/cool_features/gmap_xml', { menu: ['템플릿', 'Cool Features', 'GMap Skins'] });
});
/**
 * App Views
 */
router.get('/app_views/projects', function(req, res, next) {
    res.render('template/app_views/projects', { menu: ['템플릿', 'App Views', 'Projects'] });
});
router.get('/app_views/blog', function(req, res, next) {
    res.render('template/app_views/blog', { menu: ['템플릿', 'App Views', 'Blog'] });
});
router.get('/app_views/gallery', function(req, res, next) {
    res.render('template/app_views/gallery', { menu: ['템플릿', 'App Views', 'Gallery'] });
});
router.get('/app_views/forum', function(req, res, next) {
    res.render('template/app_views/forum', { menu: ['템플릿', 'App Views', 'General View'] });
});
router.get('/app_views/forum_topic', function(req, res, next) {
    res.render('template/app_views/forum_topic', { menu: ['템플릿', 'App Views', 'Topic View'] });
});
router.get('/app_views/forum_post', function(req, res, next) {
    res.render('template/app_views/forum_post', { menu: ['템플릿', 'App Views', 'Post View'] });
});
router.get('/app_views/profile', function(req, res, next) {
    res.render('template/app_views/profile', { menu: ['템플릿', 'App Views', 'Profile'] });
});
router.get('/app_views/timeline', function(req, res, next) {
    res.render('template/app_views/timeline', { menu: ['템플릿', 'App Views', 'Timeline'] });
});
router.get('/app_views/search', function(req, res, next) {
    res.render('template/app_views/search', { menu: ['템플릿', 'App Views', 'Search Page'] });
});
/**
 * E-Commerce
 */
router.get('/e_commerce/orders', function(req, res, next) {
    res.render('template/e_commerce/orders', { menu: ['템플릿', 'E-Commerce', 'Orders'] });
});
router.get('/e_commerce/products_view', function(req, res, next) {
    res.render('template/e_commerce/products_view', { menu: ['템플릿', 'E-Commerce', 'Products View'] });
});
router.get('/e_commerce/products_detail', function(req, res, next) {
    res.render('template/e_commerce/products_detail', { menu: ['템플릿', 'E-Commerce', 'Products Detail'] });
});
/**
 * Miscellaneous
 */
router.get('/miscellaneous/landing_page', function(req, res, next) {
    res.render('template/miscellaneous/landing_page', { menu: ['템플릿', 'Miscellaneous', 'Landing Page'] });
});
router.get('/miscellaneous/pricing_table', function(req, res, next) {
    res.render('template/miscellaneous/pricing_table', { menu: ['템플릿', 'Miscellaneous', 'Pricing Tables'] });
});
router.get('/miscellaneous/invoice', function(req, res, next) {
    res.render('template/miscellaneous/invoice', { menu: ['템플릿', 'Miscellaneous', 'Invoice'] });
});
router.get('/miscellaneous/login', function(req, res, next) {
    res.render('template/miscellaneous/login', { menu: ['템플릿', 'Miscellaneous', 'Login'] });
});
router.get('/miscellaneous/register', function(req, res, next) {
    res.render('template/miscellaneous/register', { menu: ['템플릿', 'Miscellaneous', 'Register'] });
});
router.get('/miscellaneous/forgotpassword', function(req, res, next) {
    res.render('template/miscellaneous/forgotpassword', { menu: ['템플릿', 'Miscellaneous', 'Forgot Password'] });
});
router.get('/miscellaneous/lock', function(req, res, next) {
    res.render('template/miscellaneous/lock', { menu: ['템플릿', 'Miscellaneous', 'Locked Screen'] });
});
router.get('/miscellaneous/error404', function(req, res, next) {
    res.render('template/miscellaneous/error404', { menu: ['템플릿', 'Miscellaneous', 'Error 404'] });
});
router.get('/miscellaneous/error500', function(req, res, next) {
    res.render('template/miscellaneous/error500', { menu: ['템플릿', 'Miscellaneous', 'Error 500'] });
});
router.get('/miscellaneous/blank', function(req, res, next) {
    res.render('template/miscellaneous/blank', { menu: ['템플릿', 'Miscellaneous', 'Blank Page'] });
});

module.exports = router;