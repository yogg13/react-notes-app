import React, { Component } from "react";
import "remixicon/fonts/remixicon.css";

class NoteApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: this.props.newInitialData,
			archivedNotes: [], // Menyimpan catatan yang diarsip
			newNoteTitle: "",
			newNoteBody: "",
			searchKeyword: "",
			showArchived: false, // State untuk menampilkan/menyembunyikan catatan diarsip
			remainingCharacters: 50,
		};
	}

	// Fungsi untuk menambah catatan baru
	addNote = () => {
		const { notes, newNoteTitle, newNoteBody } = this.state;
		const newNote = {
			id: +new Date(),
			title: newNoteTitle,
			body: newNoteBody,
			archived: false,
			createdAt: new Date().toLocaleDateString("id-ID"),
		};

		this.setState({
			notes: [...notes, newNote],
			newNoteTitle: "",
			newNoteBody: "",
			remainingCharacters: 50,
		});
	};

	// Fungsi untuk menghapus catatan
	deleteNote = (id) => {
		const { notes, archivedNotes } = this.state;

		const newData = notes.filter((note) => {
			return note.id !== id;
		});

		const newDataArchived = archivedNotes.filter((note) => {
			return note.id !== id;
		});

		if (archivedNotes.length === 0) {
			this.setState({
				notes: newData,
			});
		} else {
			this.setState({
				notes: newData,
				archivedNotes: newDataArchived,
			});
		}
	};

	// Fungsi untuk mengarsipkan/catatan dari arsip
	toggleArchive = (id) => {
		const { notes, archivedNotes } = this.state;

		const updatedArchivedNotes = archivedNotes.filter((note) => note.id !== id);

		this.setState((prevState) => {
			return {
				notes: prevState.notes.map((note) =>
					note.id === id ? { ...note, archived: !note.archived } : note,
				),

				archivedNotes: notes.find((note) => note.id === id && note.archived)
					? updatedArchivedNotes
					: [...updatedArchivedNotes, notes.find((note) => note.id === id)],
			};
		});
	};

	// Fungsi untuk menampilkan/menyembunyikan catatan diarsip
	toggleArchivedNotes = () => {
		this.setState((prevState) => ({
			showArchived: !prevState.showArchived,
		}));
	};

	// Fungsi untuk meng-handle perubahan pada input judul catatan
	handleTitleChange = (e) => {
		this.setState({ newNoteTitle: e.target.value });
	};

	// Fungsi untuk meng-handle perubahan pada input isi catatan
	handleBodyChange = (e) => {
		this.setState({ newNoteBody: e.target.value });
	};

	// Fungsi untuk meng-handle perubahan pada input pencarian
	handleSearchChange = (e) => {
		this.setState({ searchKeyword: e.target.value });
	};

	render() {
		const {
			notes,
			archivedNotes,
			newNoteTitle,
			newNoteBody,
			searchKeyword,
			showArchived,
			remainingCharacters,
		} = this.state;

		// Filter catatan berdasarkan keyword pencarian
		const filteredNotes = notes.filter((note) =>
			note.title.toLowerCase().includes(searchKeyword.toLowerCase()),
		);

		// Filter catatan diarsip berdasarkan keyword pencarian
		const filteredArchivedNotes = archivedNotes.filter((note) =>
			note.title.toLowerCase().includes(searchKeyword.toLowerCase()),
		);

		return (
			<div>
				{showArchived ? (
					<>
						<div className="note-app__nav">
							<div
								onClick={this.toggleArchivedNotes}
								className="note-app__nav-back">
								<i className="ri-arrow-left-fill"></i>
								<a>Kembali ke Halaman Catatan</a>
							</div>
							<div className="note-app__nav-title">
								<h2>Arsip Catatan</h2>
							</div>
						</div>
						<div className="note-search">
							<input
								type="text"
								placeholder="Cari Catatan"
								value={searchKeyword}
								onChange={this.handleSearchChange}
							/>
							{searchKeyword && (
								<span onClick={() => this.setState({ searchKeyword: "" })}>
									<i className="ri-close-fill ri-2x"></i>
								</span>
							)}
						</div>
					</>
				) : (
					<>
						<div className="note-app__header">
							<h1>Notes App</h1>
							<button onClick={this.toggleArchivedNotes} className="archived">
								Arsip Catatan
							</button>
						</div>
						<div className="note-input">
							<input
								type="text"
								placeholder="Judul Catatan"
								value={newNoteTitle}
								onChange={this.handleTitleChange}
								maxLength="50"
							/>
							{newNoteTitle && (
								<small className="note-input__title-limit">
									{remainingCharacters - newNoteTitle.length} Karakter Tersisa
								</small>
							)}
							<textarea
								placeholder="Isi Catatan"
								value={newNoteBody}
								onChange={this.handleBodyChange}
							/>
							<button onClick={this.addNote}>Tambah Catatan</button>
						</div>
						<div className="note-search">
							<input
								type="text"
								placeholder="Cari Catatan"
								value={searchKeyword}
								onChange={this.handleSearchChange}
							/>
							{searchKeyword && (
								<span onClick={() => this.setState({ searchKeyword: "" })}>
									<i className="ri-close-fill ri-2x"></i>
								</span>
							)}
						</div>
					</>
				)}

				<div className="notes-list">
					{filteredNotes.length !== 0 || filteredArchivedNotes.length !== 0 ? (
						<>
							{showArchived ? (
								<>
									{filteredArchivedNotes.map((note) => (
										<div key={note.id} className="note-item">
											<div className="note-item__content">
												<h3 className="note-item__title">{note.title}</h3>
												<p className="note-item__date">{note.createdAt}</p>
												<p className="note-item__body">{note.body}</p>
											</div>
											<div className="note-item__action">
												<button
													className="note-item__delete-button"
													onClick={() => this.deleteNote(note.id)}>
													Hapus
												</button>
												<button
													className="note-item__archive-button"
													onClick={() => this.toggleArchive(note.id)}>
													{!note.archived ? "Unarchive" : "Archive"}
												</button>
											</div>
										</div>
									))}
								</>
							) : (
								filteredNotes.map((note) => (
									<div key={note.id} className="note-item">
										<div className="note-item__content">
											<h3 className="note-item__title">{note.title}</h3>
											<p className="note-item__date">{note.createdAt}</p>
											<p className="note-item__body">{note.body}</p>
										</div>
										<div className="note-item__action">
											<button
												className="note-item__delete-button"
												onClick={() => this.deleteNote(note.id)}>
												Hapus
											</button>
											<button
												className="note-item__archive-button"
												onClick={() => this.toggleArchive(note.id)}>
												{note.archived ? "Unarchive" : "Archive"}
											</button>
										</div>
									</div>
								))
							)}
						</>
					) : (
						<div className="notes-list__empty-message">
							{showArchived ? (
								<h2>Tidak ada catatan di arsip</h2>
							) : (
								<h2>Tidak ada catatan yang ditemukan</h2>
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default NoteApp;
