"use client"

import React, { useEffect, useRef } from 'react'
import { Application, Assets, Sprite, Ticker } from 'pixi.js'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)

export default function EnvironmentAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<Application | null>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return

    console.log('Initializing Pixi application')
    const app = new Application({
      view: canvasRef.current,
      width: 800,
      height: 600,
      backgroundColor: 0xE6F7FF,
    })

    appRef.current = app

    async function loadAssets() {
      try {
        await Assets.load([
          { name: 'person', url: '/assets/person.png' },
          { name: 'trash', url: '/assets/trash.png' },
          { name: 'bin', url: '/assets/bin.png' },
          { name: 'truck', url: '/assets/truck.png' },
        ])
        setup()
      } catch (error) {
        console.error('Failed to load assets:', error)
      }
    }

    function setup() {
      if (!appRef.current) {
        console.error('App reference is null in setup')
        return
      }

      console.log('Setting up scene')
      const person = Sprite.from('person')
      const trash = Sprite.from('trash')
      const bin = Sprite.from('bin')
      const truck = Sprite.from('truck')

      appRef.current.stage.addChild(person, trash, bin, truck)

      // Set initial positions
      person.position.set(100, 400)
      trash.position.set(300, 450)
      bin.position.set(600, 400)
      truck.position.set(800, 500)

      // Animation timeline
      const tl = gsap.timeline({ repeat: -1 })
      animationRef.current = tl

      tl.to(person, { x: 250, duration: 2, ease: 'power1.inOut' })
        .to(trash, { y: 400, duration: 0.5, ease: 'bounce.out' }, '-=0.5')
        .to(person, { x: 550, duration: 2, ease: 'power1.inOut' })
        .to(trash, { x: 580, y: 380, duration: 1, ease: 'power1.inOut' }, '-=2')
        .to(person, { x: 100, duration: 2, ease: 'power1.inOut' })
        .to(truck, { x: 500, duration: 3, ease: 'power1.inOut' }, '-=2')
        .to(trash, { y: 480, duration: 0.5, ease: 'bounce.out' })
        .to(truck, { x: 800, duration: 3, ease: 'power1.inOut' })

      // Make elements interactive
      person.eventMode = 'static'
      person.cursor = 'pointer'
      person.on('pointerdown', () => {
        gsap.to(person, { y: 380, duration: 0.2, yoyo: true, repeat: 1 })
      })

      truck.eventMode = 'static'
      truck.cursor = 'pointer'
      truck.on('pointerdown', () => {
        gsap.to(truck, { y: 480, duration: 0.2, yoyo: true, repeat: 1 })
      })
    }

    loadAssets()

    return () => {
      console.log('Cleaning up')
      if (animationRef.current) {
        console.log('Killing GSAP animation')
        animationRef.current.kill()
      }

      if (appRef.current) {
        console.log('Cleaning up Pixi application')
        // Remove all children from the stage
        while (appRef.current.stage.children.length > 0) {
          const child = appRef.current.stage.children[0]
          appRef.current.stage.removeChild(child)
          if ('destroy' in child && typeof child.destroy === 'function') {
            child.destroy({ children: true, texture: true })
          }
        }

        // Safely destroy the application
        if (typeof appRef.current.destroy === 'function') {
          console.log('Destroying Pixi application')
          try {
            appRef.current.destroy(true, { children: true, texture: true })
          } catch (error) {
            console.error('Error while destroying Pixi application:', error)
          }
        } else {
          console.warn('Pixi application destroy method not available')
        }
      } else {
        console.warn('Pixi application reference is null during cleanup')
      }

      // Safely stop the PIXI shared ticker
      if (Ticker.shared && typeof Ticker.shared.destroy === 'function') {
        console.log('Destroying Pixi shared ticker')
        try {
          Ticker.shared.destroy()
        } catch (error) {
          console.error('Error while destroying Pixi ticker:', error)
        }
      } else {
        console.warn('Pixi shared ticker or its destroy method not available')
      }

      appRef.current = null
    }
  }, [])

  return <canvas ref={canvasRef} />
}