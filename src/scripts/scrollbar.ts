// A slim scrollbar that floats over the page instead of the browser's own, which reserves a column on the right
// that no section can paint behind (so the cherry sections stopped short of the edge). Drag the thumb, or click
// the track to jump there. Touch screens keep their own overlay scrolling, so it's only added for mouse pointers.

const MIN_THUMB = 48;

function initScrollbar() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  document.documentElement.classList.add('custom-scrollbar');

  const track = document.createElement('div');
  track.className = 'scrollbar';
  track.setAttribute('aria-hidden', 'true');
  const thumb = document.createElement('div');
  thumb.className = 'scrollbar-thumb';
  track.appendChild(thumb);
  document.body.appendChild(track);

  let frame = 0;
  let thumbHeight = 0;
  let dragStartY = 0;
  let dragStartScroll = 0;

  const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

  const update = () => {
    frame = 0;
    const trackHeight = track.clientHeight;
    const docHeight = document.documentElement.scrollHeight;
    const max = maxScroll();
    track.classList.toggle('scrollbar-hidden', max <= 0);
    if (max <= 0) return;
    thumbHeight = Math.max(MIN_THUMB, (window.innerHeight / docHeight) * trackHeight);
    const top = (window.scrollY / max) * (trackHeight - thumbHeight);
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translateY(${top}px)`;
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  // pixels of thumb movement → pixels of page scroll
  const ratio = () => maxScroll() / (track.clientHeight - thumbHeight);

  thumb.addEventListener('pointerdown', e => {
    e.preventDefault();
    e.stopPropagation();
    thumb.setPointerCapture(e.pointerId);
    dragStartY = e.clientY;
    dragStartScroll = window.scrollY;
    track.classList.add('scrollbar-dragging');
    document.documentElement.style.scrollBehavior = 'auto';
  });

  thumb.addEventListener('pointermove', e => {
    if (!thumb.hasPointerCapture(e.pointerId)) return;
    window.scrollTo(0, dragStartScroll + (e.clientY - dragStartY) * ratio());
  });

  const endDrag = (e: PointerEvent) => {
    if (!thumb.hasPointerCapture(e.pointerId)) return;
    thumb.releasePointerCapture(e.pointerId);
    track.classList.remove('scrollbar-dragging');
    document.documentElement.style.scrollBehavior = '';
  };
  thumb.addEventListener('pointerup', endDrag);
  thumb.addEventListener('pointercancel', endDrag);

  // clicking the track centres the thumb on that point
  track.addEventListener('pointerdown', e => {
    const rect = track.getBoundingClientRect();
    const target = (e.clientY - rect.top - thumbHeight / 2) * ratio();
    window.scrollTo({top: target, behavior: 'smooth'});
  });

  update();
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule);
  // the page grows as islands hydrate and images load
  new ResizeObserver(schedule).observe(document.body);
}

initScrollbar();
