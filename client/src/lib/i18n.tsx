import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ja' | 'zh';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    // Login
    'login.title': 'ICHI-GEKI',
    'login.subtitle': 'Sign in to your AI animation workspace',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.forgotPassword': 'Forgot password?',
    'login.submit': 'Log in',
    'login.noAccount': "Don't have an account?",
    'login.signup': 'Sign up',

    // Dashboard
    'dashboard.title': 'My Dashboard',
    'dashboard.search': 'Search projects...',
    'dashboard.create': 'Create New Material',
    'dashboard.table.project': 'Project Name',
    'dashboard.table.status': 'Status',
    'dashboard.table.languages': 'Languages',
    'dashboard.table.updated': 'Last Updated',
    'dashboard.table.actions': 'Actions',
    'dashboard.status.draft': 'Draft',
    'dashboard.status.processing': 'Processing',
    'dashboard.status.completed': 'Completed',
    'dashboard.status.post_editing': 'Post-Editing',
    'dashboard.action.duplicate': 'Duplicate',
    'dashboard.action.delete': 'Delete',

    // Create Project
    'create.title': 'Create Translation Material',
    'create.step1': 'Upload File',
    'create.step2': 'Material Settings',
    'create.step1.title': 'Step 1: Upload File',
    'create.step1.desc': 'Drag and drop your PowerPoint (PPT/PPTX) or PDF file here.',
    'create.step2.title': 'Step 2: Material Settings',
    'create.step2.desc': 'Configure how you want to generate your animation materials.',
    'create.label.videoTitle': 'Video Title',
    'create.label.sourceLang': 'Source Language',
    'create.label.template': 'Video Template',
    'create.label.voiceStyle': 'Voice Style',
    'create.label.targetSubtitles': 'Target Subtitles',
    'create.label.targetAudio': 'Target Audio',
    'create.label.targetMaterial': 'Target Material',
    'create.btn.back': 'Back',
    'create.btn.create': 'Create Material',
    'create.placeholder.selectLang': 'Select language',
    'create.placeholder.selectTemplate': 'Select template',
    'create.placeholder.selectVoice': 'Select voice',
    'create.option.business': 'Business',
    'create.option.creative': 'Creative',

    // Workspace
    'workspace.title': 'Translation Material Workspace',
    'workspace.return': 'Return to Dashboard',
    'workspace.project': 'Project',
    'workspace.section.subtitles': 'Subtitles',
    'workspace.section.audio': 'Audio',
    'workspace.section.material': 'Presentation Material',
    'workspace.markConfirmed': 'Mark as Confirmed',
    'workspace.originalPreview': 'Original (Preview)',
    'workspace.translatedPostEdit': 'Translated (Post-Edit)',
    'workspace.saveChanges': 'Save Changes',
    'workspace.previewAnimation': 'Preview Animation',
    'workspace.downloadPPTX': 'Download PPTX',
    'workspace.uploadReplacement': 'Upload Replacement',
    'workspace.finalizeFile': 'Finalize File',
    'workspace.saveReturn': 'Save & Return to Dashboard',
    'workspace.pptPreview': 'PPT Preview (Page 1/12)',
  },
  ja: {
    // Login
    'login.title': 'ICHI-GEKI',
    'login.subtitle': 'AI動画作成ワークスペースにサインイン',
    'login.email': 'メールアドレス',
    'login.password': 'パスワード',
    'login.forgotPassword': 'パスワードをお忘れですか？',
    'login.submit': 'ログイン',
    'login.noAccount': 'アカウントをお持ちではありませんか？',
    'login.signup': '新規登録',

    // Dashboard
    'dashboard.title': 'マイダッシュボード',
    'dashboard.search': 'プロジェクトを検索...',
    'dashboard.create': '新規資料作成',
    'dashboard.table.project': 'プロジェクト名',
    'dashboard.table.status': 'ステータス',
    'dashboard.table.languages': '言語',
    'dashboard.table.updated': '最終更新日',
    'dashboard.table.actions': '操作',
    'dashboard.status.draft': '下書き',
    'dashboard.status.processing': '処理中',
    'dashboard.status.completed': '完了',
    'dashboard.status.post_editing': 'ポストエディット中',
    'dashboard.action.duplicate': '複製',
    'dashboard.action.delete': '削除',

    // Create Project
    'create.title': '翻訳素材の作成',
    'create.step1': 'ファイルのアップロード',
    'create.step2': '素材の設定',
    'create.step1.title': 'ステップ1: ファイルのアップロード',
    'create.step1.desc': 'PowerPoint (PPT/PPTX) または PDFファイルをここにドラッグ＆ドロップしてください',
    'create.step2.title': 'ステップ2: 素材の設定',
    'create.step2.desc': '動画のタイトル、言語、スタイルなどを設定します',
    'create.label.videoTitle': '動画のタイトル',
    'create.label.sourceLang': 'アップロードしたファイルの言語',
    'create.label.template': '動画のテンプレート (任意)',
    'create.label.voiceStyle': '使用する声のスタイル (任意)',
    'create.label.targetSubtitles': '生成する動画の言語 (字幕)',
    'create.label.targetAudio': '生成する動画の言語 (音声)',
    'create.label.targetMaterial': '生成する動画の言語 (資料)',
    'create.btn.back': '戻る',
    'create.btn.create': '翻訳素材を作成する',
    'create.placeholder.selectLang': '言語を選択',
    'create.placeholder.selectTemplate': 'テンプレートを選択',
    'create.placeholder.selectVoice': '声を選択',
    'create.option.business': 'ビジネス',
    'create.option.creative': 'クリエイティブ',

    // Workspace
    'workspace.title': '翻訳素材ワークスペース',
    'workspace.return': 'ダッシュボードに戻る',
    'workspace.project': 'プロジェクト',
    'workspace.section.subtitles': '字幕',
    'workspace.section.audio': '音声',
    'workspace.section.material': '資料',
    'workspace.markConfirmed': '確認済みにする',
    'workspace.originalPreview': 'プレビュー',
    'workspace.translatedPostEdit': 'ポストエディット (字幕テキストを編集)',
    'workspace.saveChanges': '変更を保存',
    'workspace.previewAnimation': '動画を作成する',
    'workspace.downloadPPTX': '資料をダウンロード',
    'workspace.uploadReplacement': '資料をアップロードして更新',
    'workspace.finalizeFile': 'ファイル未設定', // Based on screenshot "ファイル未設定" looks like status or button
    'workspace.saveReturn': '保存してダッシュボードに戻る',
    'workspace.pptPreview': 'PPTプレビュー (ダミー)',
  },
  zh: {
    // Login
    'login.title': 'ICHI-GEKI',
    'login.subtitle': '登录到您的AI动画工作区',
    'login.email': '电子邮件',
    'login.password': '密码',
    'login.forgotPassword': '忘记密码？',
    'login.submit': '登录',
    'login.noAccount': '还没有账号？',
    'login.signup': '注册',

    // Dashboard
    'dashboard.title': '我的仪表板',
    'dashboard.search': '搜索项目...',
    'dashboard.create': '创建新素材',
    'dashboard.table.project': '项目名称',
    'dashboard.table.status': '状态',
    'dashboard.table.languages': '语言',
    'dashboard.table.updated': '最后更新',
    'dashboard.table.actions': '操作',
    'dashboard.status.draft': '草稿',
    'dashboard.status.processing': '处理中',
    'dashboard.status.completed': '完成',
    'dashboard.status.post_editing': '后期编辑中',
    'dashboard.action.duplicate': '复制',
    'dashboard.action.delete': '删除',

    // Create Project
    'create.title': '创建翻译素材',
    'create.step1': '上传文件',
    'create.step2': '素材设置',
    'create.step1.title': '步骤 1: 上传文件',
    'create.step1.desc': '将 PowerPoint (PPT/PPTX) 或 PDF 文件拖放到此处。',
    'create.step2.title': '步骤 2: 素材设置',
    'create.step2.desc': '配置如何生成您的动画素材。',
    'create.label.videoTitle': '视频标题',
    'create.label.sourceLang': '源语言',
    'create.label.template': '视频模板',
    'create.label.voiceStyle': '语音风格',
    'create.label.targetSubtitles': '目标字幕',
    'create.label.targetAudio': '目标音频',
    'create.label.targetMaterial': '目标素材',
    'create.btn.back': '返回',
    'create.btn.create': '创建素材',
    'create.placeholder.selectLang': '选择语言',
    'create.placeholder.selectTemplate': '选择模板',
    'create.placeholder.selectVoice': '选择语音',
    'create.option.business': '商务',
    'create.option.creative': '创意',

    // Workspace
    'workspace.title': '翻译素材工作区',
    'workspace.return': '返回仪表板',
    'workspace.project': '项目',
    'workspace.section.subtitles': '字幕',
    'workspace.section.audio': '音频',
    'workspace.section.material': '演示素材',
    'workspace.markConfirmed': '标记为已确认',
    'workspace.originalPreview': '原始预览',
    'workspace.translatedPostEdit': '翻译后编辑',
    'workspace.saveChanges': '保存更改',
    'workspace.previewAnimation': '预览动画',
    'workspace.downloadPPTX': '下载 PPTX',
    'workspace.uploadReplacement': '上传替换',
    'workspace.finalizeFile': '定稿文件',
    'workspace.saveReturn': '保存并返回仪表板',
    'workspace.pptPreview': 'PPT 预览 (第 1/12 页)',
  }
};

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja'); // Default to Japanese as per screenshot

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
