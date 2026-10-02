import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import BuilderHeader from '../components/BuilderHeader';
import { FolderTreeIcon, MessageSquareIcon } from 'lucide-react';
import ChatPanel from '../components/ChatPanel';
import FileExplorer from '../components/FileExplorer';
import PreviewPanel from '../components/PreviewPanel';
import AgentProgressDashboard from '../components/AgentProgressDashboard';
import PublishModel from '../components/PublishModel';
import api from '../api/api';
import toast from 'react-hot-toast';
import { exportProjectZip } from '../utils/exportProject';

const BuilderPage = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [leftTab, setLeftTab] = useState("chat");
  const [publishing, setPublishing] = useState(false);
  const [publishUrl, setPublishUrl] = useState(null);

  const {activeProject, loadingActiveProject, activeFile, showCode, setActiveFile, setShowCode, loadProject, logout, chatLoading, handleChat} = useAppContext();

  useEffect(()=>{
    if(!id) return;
    loadProject(id)
  },[id])

  const handleOpenPreview = ()=>{
    if(!id) return;
    window.open(`/preview/${id}`, "_blank")
  }

  const handlePublish = async () => {
    if(!id) return;
    setPublishing(true)
    try {
      await api.post(`/api/projects/${id}/publish`);
      const url = `${window.location.origin}/publish/${id}`;
      setPublishUrl(url);
      toast.success("Website published successfully!")
    } catch (err) {
      console.error("Publish failed:", err);
      toast.error(err?.response?.data?.error || "Publish failed");
    }finally{
      setPublishing(false)
    }
  }

  const handleDownload = () => {
    if(!activeProject) return;
    exportProjectZip(activeProject)
  }

  if(loadingActiveProject || !activeProject){
    return <Loading />
  }

  return (
    <div className="h-screen flex flex-col bg-[#090314] overflow-hidden text-white relative font-sans">
      {/* Top Bar Header */}
      <BuilderHeader
      projectName={activeProject.name}
      version={activeProject.version}
      showCode={showCode}
      publishing={publishing}
      onToggleShowCode={()=> setShowCode(!showCode)}
      onOpenPreview={handleOpenPreview}
      onPublish={handlePublish}
      onDownload={handleDownload}
      onBack={()=> navigate("/")}
      onLogout={logout} />

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[320px] shrink-0 flex flex-col border-r border-white/10 bg-[#0e051f]/90 backdrop-blur-xl">
          {/* Sidebar Tabs */}
          <div className="flex border-b border-white/10 bg-black/20">
            <button onClick={()=> setLeftTab("chat")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium cursor-pointer transition ${leftTab === "chat" ? "text-purple-300 border-b-2 border-purple-400 bg-white/5 font-semibold" : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"}`}>
              <MessageSquareIcon size={13} className={leftTab === "chat" ? "text-purple-400" : "text-zinc-500"} /> Chat
            </button>

            <button onClick={()=> setLeftTab("files")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium cursor-pointer transition ${ leftTab === "files" ? "text-purple-300 border-b-2 border-purple-400 bg-white/5 font-semibold" : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]" }`}>
              <FolderTreeIcon size={13} className={leftTab === "files" ? "text-purple-400" : "text-zinc-500"} /> Files
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-hidden">
            {
              leftTab === 'chat' ? (
                <ChatPanel messages={activeProject.messages} onSend={handleChat} loading={chatLoading}/>
              ) : (
                <FileExplorer files={activeProject.files} activeFile={activeFile} onFileSelect={(path)=>{
                  setActiveFile(path);
                  setShowCode(true)
                }}/>
              )
            }

          </div>
        </div>

        {/* Preview / Code Area */}
        <div className="flex-1 overflow-hidden bg-[#090314]">
            {activeProject.status === "pending" || activeProject.status === "generating" || activeProject.status === "failed" ? (
              <AgentProgressDashboard project={activeProject}/>
            ) : (
              <PreviewPanel project={activeProject} activeFile={activeFile} showCode={showCode}/>
            )}
        </div>
      </div>

      {publishUrl && <PublishModel publishUrl={publishUrl} onClose={()=> setPublishUrl(null)}/>}
    </div>
  )
}

export default BuilderPage