=== Ocasio Auto Copyright Year ===
Contributors: ocas
Tags: copyright year, auto copyright, dynamic year, footer year, shortcode
Requires at least: 6.0
Tested up to: 6.7
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Automatically displays the dynamic current year, copyright symbol, and copyright text via simple shortcodes.

== Description ==

Every January, thousands of website owners forget to update the copyright year in their website footers. Having an outdated year on your website looks sloppy and makes your business look inactive or abandoned.

Ocasio Auto Copyright Year fixes this permanently with a single shortcode. Just drop `[year]` into your theme footer, widget, page, or block template, and your copyright notice updates automatically every single year.

You also get helper shortcodes for the copyright symbol `[copyright-symbol]` (&copy;) and copyright text `[copyright-text]`.

Set it once and never touch your footer copyright date again.

= Available Shortcodes =

* `[year]` - Outputs the current dynamic four-digit year (e.g. 2026).
* `[copyright-symbol]` - Outputs the standard copyright symbol (&copy;).
* `[copyright-text]` - Outputs the standard copyright text.

= Real-World Example =

Combine them in your footer text block:
`[copyright-symbol] [year] Your Company Name. All rights reserved.`

Renders on your site as:
&copy; 2026 Your Company Name. All rights reserved.

= Features =

* **Zero Maintenance:** Updates automatically on January 1st every year without manual edits.
* **1-Click Shortcode Reference:** Copy shortcodes in one click from your WordPress dashboard.
* **Zero Front-End Assets:** Pure PHP execution with 0 bytes of extra CSS or JavaScript loaded on public pages.
* **Works Everywhere:** Compatible with classic widgets, block themes, page builders, and footer templates.

== Installation ==

1. Upload the `ocasio-auto-copyright-year` folder to your `/wp-content/plugins/` directory, or install it directly through the WordPress plugins screen.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Go to **Ocasio Plugins -> Copyright Year** to view and copy your shortcodes.

== Frequently Asked Questions ==

= Does this plugin slow down my site? =
No. The plugin uses lightweight PHP shortcode functions that execute in microseconds and loads zero CSS or JavaScript on your public pages.

= Can I use this shortcode inside a footer widget? =
Yes. WordPress supports shortcodes in standard text and HTML widgets.

== Changelog ==

= 1.0.0 =
* Initial public release.
