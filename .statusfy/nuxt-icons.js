export default async function (ctx, inject) {
  const icons = {"16x16":"/static/icons/icon_16.1bedcf.png","120x120":"/static/icons/icon_120.1bedcf.png","144x144":"/static/icons/icon_144.1bedcf.png","152x152":"/static/icons/icon_152.1bedcf.png","192x192":"/static/icons/icon_192.1bedcf.png","384x384":"/static/icons/icon_384.1bedcf.png","512x512":"/static/icons/icon_512.1bedcf.png"}
  const getIcon = size => icons[size + 'x' + size] || ''
  inject('icon', getIcon)
}
