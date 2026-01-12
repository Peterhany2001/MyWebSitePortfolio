document.addEventListener('DOMContentLoaded', function () {
    // simple entrance for elements with .anim-hidden
    document.querySelectorAll('.anim-hidden').forEach(function (el, i) {
        var d = el.getAttribute('data-delay');
        var delay = d ? parseInt(d, 10) : i * 120;
        setTimeout(function () { el.classList.add('anim-in'); }, delay);
    });

    // fade-left elements
    document.querySelectorAll('.fade-left-hidden').forEach(function (el, i) {
        var d = el.getAttribute('data-delay');
        var delay = d ? parseInt(d, 10) : i * 120;
        setTimeout(function () { el.classList.add('fade-left-in'); }, delay);
    });

    // stagger children: apply transition-delay per child then add 'in' class
    document.querySelectorAll('.stagger-children').forEach(function (wrap) {
        var children = Array.from(wrap.children);
        children.forEach(function (ch, idx) { ch.style.transitionDelay = (idx * 100) + 'ms'; ch.classList.add('anim-hidden'); });
        setTimeout(function () { wrap.classList.add('in'); children.forEach(function (ch) { if (ch.classList.contains('anim-hidden')) ch.classList.add('anim-in'); }); }, 150);
    });

    // Initialize EmailJS (replace 'YOUR_EMAILJS_USER_ID' with your actual user ID)
    if (window.emailjs) {
        try { emailjs.init('_phe3LINQKn-9I85M'); } catch (e) { /* ignore init errors until configured */ }
    }

    // Contact form submit handler using EmailJS
    var contactForm = document.getElementById('contact-form');
    if (contactForm && window.emailjs) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;
            // Build template parameters explicitly with common aliases so names map correctly
            var name = contactForm.querySelector('[name="user_name"]').value || '';
            var email = contactForm.querySelector('[name="user_email"]').value || '';
            var message = contactForm.querySelector('[name="message"]').value || '';

            var templateParams = {
                // original names
                user_name: name,
                user_email: email,
                
                message: message,
                // common aliases used in many EmailJS templates
                from_name: name,
                name: name,
                reply_to: email,
                email: email
            };
            console.debug('EmailJS template params:', templateParams);

            // Service ID: service_q8oiq5e
            // Template ID: template_h3xx3jo
            emailjs.send('service_q8oiq5e', 'template_h3xx3jo', templateParams)
                .then(function () {
                    console.info('EmailJS send success');
                    alert('Message sent — thank you!');
                    contactForm.reset();
                    if (submitBtn) submitBtn.disabled = false;
                }, function (error) {
                    alert('Send failed: ' + (error && error.text ? error.text : error));
                    console.error('EmailJS error:', error);
                    if (error && error.text) console.debug('EmailJS response text:', error.text);
                    if (submitBtn) submitBtn.disabled = false;
                });
        });
    }
});
