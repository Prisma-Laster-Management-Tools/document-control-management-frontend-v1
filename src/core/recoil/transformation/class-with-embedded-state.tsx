import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { RecoilState, SetterOrUpdater, useRecoilState } from 'recoil';
import Playground from '../../../components/pages/playground/Playground';
import { authenticationState } from '../../../store/recoil/authentication/authentication.atom';

interface IAtomMapped{
  atom: TAvailableRecoilAtom
  name:string
}

interface ILinkedStateStorage{
  [key:string]: TLinkedStateSignature
}

export type TLinkedStateSignature<T = any> = {
  get: T,
  set: SetterOrUpdater<T>
}

type TAvailableRecoilAtom = "authentication" | "cached"

export function CreateClassWithEmbeddedState($class:any,includes:Array<IAtomMapped>) {
  // return a newly createed anonymous function class to wrap the component class
  return (props:any) => {
    const [LinkedStateStorage,setLinkedStateStorage] = useState<ILinkedStateStorage>({})

    // pre importation
    const [authState,setAuthState] = useRecoilState(authenticationState)
    // ─────────────────────────────────────────────────────────────────


    useEffect(() => {
      function getRecoilFromName(name:TAvailableRecoilAtom){
        if(name === 'authentication'){
          return {set:setAuthState,get:authState}
        }
      }

      includes.forEach((atom,index) => {
        const recoil = getRecoilFromName('authentication')
        setLinkedStateStorage(prevState => ({
           ...prevState,
           [atom.name]: {
             set: setAuthState,
             get: authState
           }
         }))
      })

    },[authState])
    return <$class {...props} {...LinkedStateStorage} />
  }
}