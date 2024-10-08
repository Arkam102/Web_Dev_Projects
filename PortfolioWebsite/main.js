const iconToggle = document.querySelector(".toggle_icon");
const navbarMenu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu_link");
const iconClose = document.querySelector(".close_icon");

iconToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
});
iconClose.addEventListener('click', () => {
  navbarMenu.classList.remove('active');
});
menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', () => {
    navbarMenu.classList.remove('active');
  });
});
const sections = document.querySelectorAll('.section');

sections.forEach((section, index) => {
  if (index % 2 === 0) {
    section.classList.add('scroll-animation-left');
  } else {
    section.classList.add('scroll-animation-right');
  }
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); 
    }
  });
}, { threshold: 0.1 });
sections.forEach(section => {
  observer.observe(section);
});
document.addEventListener("DOMContentLoaded", () => {
  const progressSections = document.querySelectorAll('.progressBox');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.progress_bar');
        const progressValue = entry.target.querySelector('.progress_value');
        const finalWidth = parseFloat(progressValue.textContent); // Extract the final percentage from the text

        animateProgressBar(progressBar, progressValue, finalWidth);
      }
    });
  }, {
    threshold: 0.5 
  });

  progressSections.forEach(section => {
    observer.observe(section);
  });

  document.querySelectorAll('.progress').forEach(progressContainer => {
    const progressBar = progressContainer.querySelector('.progress_bar');
    const progressValue = progressContainer.previousElementSibling.querySelector('.progress_value');
    const initialWidth = parseFloat(progressValue.textContent); 
    let isDragging = false;

    progressContainer.addEventListener('mousedown', (event) => {
      isDragging = true;
      updateProgress(event);
    });

    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        updateProgress(event);
      }
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        resetProgress(); 
      }
    });

    function updateProgress(event) {
      const progressWidth = progressContainer.offsetWidth;
      const mouseX = event.clientX - progressContainer.getBoundingClientRect().left;
      let newWidth = Math.min(Math.max(mouseX / progressWidth * 100, 0), 100);
      newWidth = Math.round(newWidth);
      progressBar.style.width = newWidth + '%';
      progressValue.textContent = newWidth + '%';
    }

    function resetProgress() {
      progressBar.style.width = initialWidth + '%';
      progressValue.textContent = initialWidth + '%';
    }
  });

  function animateProgressBar(progressBar, progressValue, finalWidth) {
    let currentWidth = 0;
    
    const animateProgress = setInterval(() => {
      if (currentWidth >= finalWidth) {
        clearInterval(animateProgress);
      } else {
        currentWidth++;
        progressBar.style.width = currentWidth + '%';
        progressValue.textContent = currentWidth + '%';
      }
    }, 10); 
  }
});
function handleScroll() {
  if (isScrolling) return;

  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section');
  const currentScroll = window.scrollY + header.offsetHeight;
  
  header.classList.toggle('active', window.scrollY >= 20);

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    const correspondingMenuItem = document.querySelector(`a[href="#${sectionId}"]`);

    if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
      document.querySelectorAll('.menu_link').forEach((item) => {
        item.classList.remove('active_link');
      });
      correspondingMenuItem.classList.add('active_link');
    }
  });
}

window.addEventListener('scroll', handleScroll);

const typed = document.querySelector('.typed');
if (typed) {
  let typed_strings = typed.getAttribute('data-typed-items');
  typed_strings = typed_strings.split(',');
  new Typed('.typed', {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
}

let isScrolling = false;

menuLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    menuLinks.forEach(item => {
      item.classList.remove('active_link');
    });
    this.classList.add('active_link');

    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    isScrolling = true;

    window.scrollTo({
      top: targetSection.offsetTop - header.offsetHeight,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling = false;
    }, 1000); 
  });
});
function sendMail(event) {
  event.preventDefault();

  const btn = document.getElementById('button');
  btn.innerHTML = 'Sending...';

  const serviceID = 'service_9qlfs8j';
  const templateID = 'template_t6bqr2h';

  const name = document.getElementById('name').value;
  const email = document.getElementById('email_id').value;
  const message = document.getElementById('message').value;

  const templateParams = {
    name: name,
    email: email,
    message: message
  };

  emailjs.send(serviceID, templateID, templateParams)
    .then(() => {
      btn.innerHTML = 'Send Mail';
      alert('Email sent successfully!');
    }, (err) => {
      btn.innerHTML = 'Send Mail';
      alert('Error sending email:', JSON.stringify(err));
    });
}
