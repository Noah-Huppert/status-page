// vue

// Dates
const Dates = require('@statusfy/common/lib/dates').default

const extraLangs = [

]

const dates = Dates()
dates.addLocales(extraLangs)

export default (ctx, inject) => {
  // Analytics

  //
  const statusfy = {
    dates,
    assets: {
      mainLogo: require('/home/noah/documents/work/red-hat/status-page/node_modules/@statusfy/core/client/assets/img/logo.svg')
    },
    iconSizes: [16, 120, 144, 152, 192, 384, 512],
    theme: {"scheduled":{"position":"belowSystems"}},
    baseUrl: "https:\u002F\u002Fstatus.kscout.io",
    notifications: {"support":{"en":"mailto:nhuppert@redhat.com"},"icalendar":true,"feeds":true,"twitter":false}
  }

  // Inject Statusfy to the context as $statusfy
  ctx['$statusfy'] = statusfy
  inject('statusfy', statusfy)
}
