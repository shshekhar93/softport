import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useRef, useEffect, useCallback } from 'react';
import { useTheme } from 'styled-components';
import AWindow from '../../../components/window';
import {ThemeType} from '../../../../theme/types';
import { AppComponentProps } from '../../../drivers/app-manager';

function EditorApp(props: AppComponentProps) {
  const theme = useTheme();
  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const editorContainer = useRef<HTMLDivElement>(null);

  const onResize = useCallback(() => {
    setTimeout(() => {
      if(!editor.current) {
        return;
      }

      editor.current.layout();
    }, 100);
  }, [ editor.current ]);

  useEffect(() => {
    if(!editor.current) {
      return;
    }

    monaco.editor.setTheme((theme as ThemeType).name === 'Dark' ? 'vs-dark' : 'vs');
  }, [ theme ]);

  useEffect(() => {
    editor.current = monaco.editor.create(editorContainer.current as HTMLElement, {
      value: '',
      language: 'text',
      theme: (theme as ThemeType).name === 'Dark' ? 'vs-dark' : 'vs'
    });

    return () => {
      if(!editor.current) {
        return;
      }
      
      editor.current.dispose();
    }
  }, []);

  return (
    <AWindow
      title="Editor"
      height={450}
      width={750}
      onResize={onResize}
      onClose={props.onClose}
    >
      <div ref={editorContainer} style={{ height: '100%' }}></div>
    </AWindow>
  );
}

export default EditorApp;
