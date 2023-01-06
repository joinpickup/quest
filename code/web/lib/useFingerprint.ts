import { useState, useEffect, useCallback } from 'react'

import Fingerprint from "@fingerprintjs/fingerprintjs"

export default function useFingerprint() {
    const [fingerprint, setFingerprint] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    Fingerprint.load()
        .then(agent => agent.get())
        .then(result => {
            setFingerprint(result.visitorId)
            setLoading(false)
    }).catch(err => {
        setError(err)
    })
  return {fingerprint, loading, error}
}
