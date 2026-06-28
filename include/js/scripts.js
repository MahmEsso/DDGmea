

/* $(document).ready(function(){
	$('.services-carousel').owlCarousel({
		loop: true,
		margin: 30,
		nav: false,
		dots: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		responsive: { 0: { items: 1 }, 768: { items: 2 }, 1024: { items: 3 } }
	});
}); */

$(document).ready(function(){
	function animateCounter(el) {
		const target = parseInt(el.getAttribute('data-target'));
		const duration = 2000;
		const step = target / (duration / 16);
		let current = 0;
		const timer = setInterval(() => {
			current += step;
			if (current >= target) { current = target; clearInterval(timer); }
			el.textContent = Math.floor(current);
		}, 16);
	}

	const counters = document.querySelectorAll('.counter');
	let counted = false;
	const statsSection = document.querySelector('.stats');

	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting && !counted) {
			counted = true;
			counters.forEach(c => animateCounter(c));
		}
	}, { threshold: 0.4 });
	if (statsSection) observer.observe(statsSection);

});


$(document).ready(function () {

  /* Service checkboxes */
  $('#serviceGrid').on('click', '.service-check-label', function () {
    const cb = $(this).find('input[type=checkbox]');
    cb.prop('checked', !cb.prop('checked'));
    $(this).toggleClass('checked', cb.prop('checked'));
  });

  /* Office tabs */
  $('.office-tab').on('click', function () {
    const panel = $(this).data('panel');
    $('.office-tab').removeClass('active');
    $('.office-panel').removeClass('active');
    $(this).addClass('active');
    $('#panel-' + panel).addClass('active');
  });

  /* Form submit */
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    const name    = $('#fullName').val().trim();
    const email   = $('#email').val().trim();
    const message = $('#message').val().trim();

    if (!name || !email || !message) {
      /* Simple shake on empty required fields */
      ['#fullName','#email','#message'].forEach(function(id){
        const el = $(id);
        if (!el.val().trim()) {
          el.css({ border:'1.5px solid #dc2626', background:'rgba(220,38,38,.04)' });
          setTimeout(function(){ el.css({ border:'1.5px solid #e4e8f0', background:'#f8f9fb' }); }, 2500);
        }
      });
      return;
    }

    /* Simulate send */
    const btn = $('.submit-btn');
    btn.html('<i class="fa-solid fa-spinner fa-spin"></i> Sending…').prop('disabled', true);

    setTimeout(function () {
      $('#contactForm')[0].reset();
      $('.service-check-label').removeClass('checked');
      btn.html('Send Message <i class="fa-solid fa-paper-plane"></i>').prop('disabled', false);
      const success = $('#formSuccess');
      success.css('display','flex');
      $('html,body').animate({ scrollTop: success.offset().top - 120 }, 400);
      setTimeout(function(){ success.fadeOut(600); }, 6000);
    }, 1200);

  });

});

  $(document).ready(function () {

    /* Filter tabs */
    $('.filter-tab').on('click', function (e) {
      e.preventDefault();
      $('.filter-tab').removeClass('active');
      $(this).addClass('active');
      applyFilters();
    });

    /* Live search */
    $('#articleSearch').on('input', function () {
      applyFilters();
    });

    function applyFilters() {
      const activeFilter = $('.filter-tab.active').data('filter');
      const query = $('#articleSearch').val().trim().toLowerCase();
      let visibleCount = 0;

      $('#articlesGrid > div').each(function () {
        const card = $(this);
        const category = card.data('category');
        const text = card.find('.ac-title').text().toLowerCase() + ' ' + card.find('.ac-excerpt').text().toLowerCase();

        const matchesFilter = activeFilter === 'all' || category === activeFilter;
        const matchesSearch = query === '' || text.indexOf(query) !== -1;

        if (matchesFilter && matchesSearch) {
          card.show();
          visibleCount++;
        } else {
          card.hide();
        }
      });

      $('#noResults').toggleClass('d-none', visibleCount !== 0);
    }

    /* Newsletter submit */
    $('#newsletterForm').on('submit', function (e) {
      e.preventDefault();
      const btn = $(this).find('button');
      const original = btn.text();
      btn.text('Subscribed ✓').prop('disabled', true);
      setTimeout(function () { btn.text(original).prop('disabled', false); }, 2500);
      this.reset();
    });

  });

