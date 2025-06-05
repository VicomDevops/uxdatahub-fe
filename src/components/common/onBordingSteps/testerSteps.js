const steps = [
    {
      id: 'intro',
      attachTo: { element: '.intro', on: 'bottom' },
      advanceOn: { selector: '.shepherd-button', event: 'click' },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'Welcome to InsightData',
      text: ['React-Shepherd is a JavaScript library for guiding users through your React app.'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }
    },
    {
        id: 'second-step',
        attachTo: { element: '.dashboard-text-header', on: 'bottom' },
        buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Back',
              type: 'back'
            },
            {
              classes: 'shepherd-button-primary',
              text: 'Next',
              type: 'next'
            }
        ],
        title: 'Deuxième étape',
        text: 'Ceci est la deuxième étape de votre guide.',
    },
    {
        id: 'third-step',
        attachTo: { element: '.dashboard-chiffre-header', on: 'bottom' },
        buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Back',
              type: 'back'
            },
            {
              classes: 'shepherd-button-primary',
              text: 'Next',
              type: 'next'
            }
        ],
        title: 'Troisième étape',
        text: 'Ceci est la troisième étape de votre guide.',
    },
    {
        id: 'fifth-step',
        attachTo: { element: '.modifierProfileBtn', on: 'bottom' },
        buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Back',
              type: 'back'
            },
            {
              classes: 'shepherd-button-primary',
              text: 'Next',
              type: 'next'
            }
        ],
        title: 'Cinquième étape',
        text: 'Ceci est la cinquième étape de votre guide.',
    },
    {
        id: 'sixth-step',
        attachTo: { element: '.btn-success', on: 'bottom' },
        buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Back',
              type: 'back'
            },
            {
              classes: 'shepherd-button-success',
              text: 'Finish',
              type: 'next'
            }
        ],
        title: 'cinquieme étape',
        text: 'Ceci est la  cinquieme étape de votre guide.',
    }
  ];

  export default steps