jQuery(document).ready(function ($) {
    // --- SUITE DASHBOARD AJAX TOGGLE ---
    $(document).on('change', '.ko-ajax-toggle', function () {
        var optName = $(this).data('option');
        var slug = $(this).data('slug');
        var isChecked = this.checked ? 1 : 0;
        var $savedPill = $('#saved-' + slug);
        var $badge = $('#badge-' + slug);

        if ($badge.length) {
            if (isChecked) {
                $badge.attr('class', 'ko-dash-badge badge-active').text('Active');
            } else {
                $badge.attr('class', 'ko-dash-badge badge-paused').text('Paused');
            }
        }

        var ajaxUrl = (typeof ocasio_vars !== 'undefined' && ocasio_vars.ajaxurl) ? ocasio_vars.ajaxurl : ajaxurl;
        var nonce = (typeof ocasio_vars !== 'undefined' && ocasio_vars.suite_nonce) ? ocasio_vars.suite_nonce : '';

        $.ajax({
            url: ajaxUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'ocasio_suite_save_toggle',
                option_name: optName,
                option_value: isChecked,
                nonce: nonce
            },
            success: function (res) {
                if (res.success && $savedPill.length) {
                    $savedPill.show();
                    setTimeout(function () {
                        $savedPill.fadeOut(200);
                    }, 1800);
                }
            },
            error: function (err) {
                console.error('Toggle save failed:', err);
            }
        });
    });

    // --- AUTO COPYRIGHT YEAR: SHORTCODE COPY & PREVIEW ---
    function showCopySuccess($btn) {
        var $icon = $btn.find('.ko-copy-icon');
        var $label = $btn.find('.ko-copy-text');
        var originalText = $label.length ? $label.text() : '';

        $btn.addClass('copied');
        if ($icon.length) {
            $icon.removeClass('dashicons-admin-page').addClass('dashicons-yes');
        }
        if ($label.length) {
            $label.text('Copied!');
        }

        setTimeout(function () {
            $btn.removeClass('copied');
            if ($icon.length) {
                $icon.removeClass('dashicons-yes').addClass('dashicons-admin-page');
            }
            if ($label.length) {
                $label.text(originalText);
            }
        }, 1800);
    }

    function copyToClipboard(text, $btn) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(function () {
                showCopySuccess($btn);
            }).catch(function () {
                fallbackCopy(text, $btn);
            });
        } else {
            fallbackCopy(text, $btn);
        }
    }

    function fallbackCopy(text, $btn) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showCopySuccess($btn);
        } catch (err) {
            console.error('Copy error:', err);
        }
        document.body.removeChild(textArea);
    }

    $(document).on('click', '.ko-btn-copy-code', function (e) {
        e.preventDefault();
        var codeText = $(this).find('code').text().trim();
        copyToClipboard(codeText, $(this));
    });

    $(document).on('click', '#ko_builder_copy_btn', function (e) {
        e.preventDefault();
        var $input = $('#ko_footer_input');
        var text = $input.length ? $input.val() : '';
        copyToClipboard(text, $(this));
    });

    var $input = $('#ko_footer_input');
    var $preview = $('#ko_footer_preview');

    if ($input.length && $preview.length) {
        var currentYear = (typeof ocasio_acy_vars !== 'undefined' && ocasio_acy_vars.current_year) ? ocasio_acy_vars.current_year : new Date().getFullYear();
        var acyNonce = (typeof ocasio_acy_vars !== 'undefined' && ocasio_acy_vars.acy_nonce) ? ocasio_acy_vars.acy_nonce : '';
        var ajaxUrl = (typeof ocasio_acy_vars !== 'undefined' && ocasio_acy_vars.ajaxurl) ? ocasio_acy_vars.ajaxurl : ajaxurl;
        var saveTimer = null;

        function renderPreview(val) {
            var parsed = val.replace(/\[year\]/gi, currentYear)
                            .replace(/\[copyright-symbol\]/gi, '\u00A9')
                            .replace(/\[copyright-text\]/gi, 'Copyright');
            $preview.text(parsed);
        }

        $input.on('input', function () {
            var val = $(this).val();
            renderPreview(val);

            clearTimeout(saveTimer);
            saveTimer = setTimeout(function () {
                $.ajax({
                    url: ajaxUrl,
                    type: 'POST',
                    data: {
                        action: 'ocasio_acy_save_template',
                        template: val,
                        nonce: acyNonce
                    },
                    error: function (err) {
                        console.error('Auto-save error:', err);
                    }
                });
            }, 400);
        });
    }
});
