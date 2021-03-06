import Ember from 'ember';

export default Ember.LinkComponent.extend({
  href: Ember.computed(function () {
    // http://discuss.emberjs.com/t/best-practices-accessing-app-config-from-addon-code/7006/19
    const ENV = Ember.getOwner(this).resolveRegistration('config:environment');
    let href = this._super(...arguments);

    if (!ENV.staticSite.appendFileExtension) {
      return href;
    }

    // Strip out query params
    const splitHref = href.split('?');
    if (splitHref.length > 1) {
      Ember.Logger.warn('Query params are ignored when using link-to with ember-cli-static-site');
    }
    href = splitHref[0];

    // Append extension if not an index route
    return href[href.length -1] === '/' ? href : `${href}.html`;
  })
});
