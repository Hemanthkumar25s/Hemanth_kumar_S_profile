import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT

  if (!formspreeEndpoint) {
    return NextResponse.json({ error: 'Formspree endpoint is not configured.' }, { status: 500 })
  }

  const data = await request.json()
  const formData = new URLSearchParams()
  formData.append('name', data.name || '')
  formData.append('email', data.email || '')
  formData.append('message', data.message || '')
  formData.append('_subject', `Portfolio message from ${data.name || 'Visitor'}`)
  formData.append('_replyto', data.email || '')

  const response = await fetch(formspreeEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  })

  const result = await response.json()

  if (!response.ok) {
    return NextResponse.json(
      { error: result?.error || 'Unable to send message through Formspree.' },
      { status: response.status }
    )
  }

  return NextResponse.json({ ok: true })
}
